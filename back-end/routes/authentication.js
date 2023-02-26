const express = require("express");
const User = require("../model/UserSchema");
const { createJSONToken } = require("../util/auth");
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  user.comparePassword(password, (err, isMatch) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userID = user._id;
    const token = createJSONToken({userID});
  
    res.status(200).json({
      token: token,
    })
  });
});

router.post('/signup', async (req, res) => {
  const {email, username, password, confirmPassword} = req.body;


  try {
    const user = new User({
      username,
      email,
      password,
      chats: [],
    })

    console.log(user);
    await user.save();

    res.status(201).json({message: 'User created'});
  } catch (err) {
    res.status(401).json({message: err.message});
  }
})

module.exports = router;
