const {validateJSONToken} = require("./auth");
const { NotAuthError } = require("./errors");

function checkAuth(req, res, next) {
  
  if (req.method === "OPTIONS") {
    return next();
  }

  if (!req.headers.authorization) {
    return next(new NotAuthError("Not Authenticated"));
  }

  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2 || authFragments[0] !== "Bearer") {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not Authenticated"));
  }

  const authToken = authFragments[1];
  
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;

    next();
  } catch (err) {
    next(new NotAuthError("Token Expired"));
  }
}

exports.checkAuth = checkAuth;
