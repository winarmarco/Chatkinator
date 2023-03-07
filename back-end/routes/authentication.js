const express = require("express");
const User = require("../model/UserSchema");
const { createJSONToken, validateEmail, validateUsername, validatePassword, validateConfirmPassword } = require("../util/auth");
const { ValidationError } = require("../util/errors");
const { checkAuth } = require("../util/middleware");
const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  let errorsMessage = [];

  if (!username) {
    errorsMessage.push({
      field: "username",
      message: "Username is required",
    })
  }

  if (!password) {
    errorsMessage.push({
      field: "password",
      message: "Password is required",
    })
  }


  try {
    if (errorsMessage.length) throw new ValidationError({message: "Some field is missing", cause: errorsMessage});

    const user = await User.findOne({ username });
    if (!user) {
      throw new ValidationError({message: "Invalid credentials", cause: [
        {
          field: "password",
          message: "Invalid credentials",
        }
      ]})
    }
    const match = await user.comparePassword(password);

    if (!match) {
      throw new ValidationError({message: "Invalid credentials", cause: [
        {
          field: "password",
          message: "We couldn't find user with that username and password"
        }
      ]})
    }

    const userID = user._id;
    const token = createJSONToken(userID);
  
    res.status(200).json({
      token: token,
    })
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const {email, username, password, confirmPassword} = req.body;
  let errorsMessage = [];
  
  
  try {
    const emailValidity = await validateEmail(email);
  
    if (emailValidity.status !== "valid") {
      if (emailValidity.status === "error") {
        throw new ServerError(emailValidity.message);
      } else {
        errorsMessage.push({
          field: "email",
          message: emailValidity.message,
        })
      }
    }

    const usernameValidity = await validateUsername(username);

    if  (usernameValidity.status !== "valid") {
      if (usernameValidity.status === "error") {
        throw new ServerError(usernameValidity.message);
      } else {
        errorsMessage.push({
          field: "username",
          message: usernameValidity.message,
        })
      }
    }

    const passwordValidity = validatePassword(password);

    if (passwordValidity.status !== "valid") {
      errorsMessage.push({
        field: "password",
        message: passwordValidity.message,
      })
    }

    const confirmPasswordValidity = validateConfirmPassword(confirmPassword, password) 

    if (confirmPasswordValidity.status !== "valid") {
      errorsMessage.push({
        field: "confirmPassword",
        message: confirmPasswordValidity.message,
      })
    }

    if (errorsMessage.length) throw new ValidationError({message: "Invalid credentials", cause: errorsMessage});

    const user = new User({
      username,
      email,
      password,
      chats: [],
    })

    await user.save();

    res.status(201).json({message: 'User created'});
  } catch (err) {
    next(err)
  }
})

router.post('/check-auth', checkAuth, (req, res) => {
  res.status(201).json({message: 'User authenticated'});
})

module.exports = router;
