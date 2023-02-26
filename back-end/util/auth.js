const { sign, verify } = require("jsonwebtoken");

const KEY = process.env.SECRET_KEY;

function createJSONToken(userID) {
  return sign({userID}, KEY, {expiresIn: '1h'});
}

function validateJSONToken(token) {
  return verify(token, secret);
}   

exports.createJSONToken = createJSONToken;
exports.validateJSONTOken = validateJSONToken;