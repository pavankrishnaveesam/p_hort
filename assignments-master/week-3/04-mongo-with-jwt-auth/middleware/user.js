const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User } = require("../db");
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req.body.authorization;
  const jwtToken = token.split(" ");
  const decodedToken = jwtToken[1];
  const decodedValue = jwt.verify(decodedToken, JWT_SECRET);
  if (decodedValue.username) {
    const username = await User.findOne({ username: decodedValue.username });
    if (username) {
      next();
    } else {
      res.status(403).json({ msg: "unauthorised" });
    }
  }
}

module.exports = userMiddleware;
