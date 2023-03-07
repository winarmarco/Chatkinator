const { sign, verify } = require("jsonwebtoken");
const User = require("../model/UserSchema");


const KEY = process.env.SECRET_KEY;

function createJSONToken(userID) {
  return sign({userID}, KEY, {expiresIn: '1h'});
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

async function validateEmail(email) {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email) return {status: "invalid", message: "Email is required"};

  try {

    const userWithEmail = await User.findOne({email: email});
    
    const emailIsValid = email.match(emailFormat);

    if (!emailIsValid) return {status: "invalid", message: "Invalid email"};

    if (userWithEmail) return {status: "invalid", message: "Email has been taken"};

    return {status: "valid"};
  } catch (err) {
    return {status: "error", message: "Something went wrong"};
  }
}

async function validateUsername(username) {

  if (!username) return {status: "invalid", message: "Username is required"};

  try {
    const userWithUsername = await User.findOne({username: username});

    if (userWithUsername) return {status: "invalid", message: "Username has been taken"};

    return {status: "valid"};

  } catch (err) {
    return {status : "error", message: "Something went wrong"};
  }
}

function validatePassword(password) {

  if (!password) return {status: "invalid", message: "Password is required"};
  // const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;

  // const passwordIsValid = password.match(passwordRegex);
  const passwordIsValid = password.length > 8;

  if (!passwordIsValid) return {status: "invalid", message: "Password must be at least 8 characters long"};

  return {status: "valid"};

}

function validateConfirmPassword(confirmPassword, password) {
  
  if (!confirmPassword) return {status: "invalid", message: "Confirm Password is required"};

  if (confirmPassword !== password) return {status: "invalid", message: "Password doesn't match"}

  return {status: "valid"};
}


exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.validateEmail = validateEmail;
exports.validateUsername = validateUsername;
exports.validatePassword = validatePassword;
exports.validateConfirmPassword = validateConfirmPassword;