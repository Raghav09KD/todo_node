const jwt = require("jsonwebtoken");

// Static token
const staticToken = "738TDYUS532732423";

// Middleware for JWT authentication
const authenticate = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Token missing." });
  }

  // Verify the token
  if (token !== `Bearer ${staticToken}`) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Invalid token." });
  }

  // Token is valid
  next();
};

module.exports = authenticate;
