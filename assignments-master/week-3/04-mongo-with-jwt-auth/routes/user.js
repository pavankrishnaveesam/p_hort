const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.create({ username, password });
  if (user) {
    const token = await jwt.sign(username, JWT_SECRET);
    res.status(200).json({ token: token, msg: "Succesfully signedup" });
  } else {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = await jwt.sign(username, JWT_SECRET);
    res.status(200).json({ token: token, msg: "Succesfully signedup" });
  } else {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
