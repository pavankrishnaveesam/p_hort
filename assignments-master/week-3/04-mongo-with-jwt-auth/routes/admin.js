const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const admin = await Admin.create({
    username: username,
    password: password,
  });
  if (admin) {
    //generate a token and store in headers
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res
      .status(200)
      .json({ token: token, msg: "Admin created successfully through signup" });
  } else {
    res.status(500).json({ msg: "DB Issue" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    //generate a token by encoding with username and store in headers
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.status(200).json({ token: token, msg: "Admin loggedin successfully" });
  } else {
    res.status(403).json({ msg: "Admin Doesn't exist" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const courseName = req.body.courseName;
  const price = req.body.price;
  const course = await Course.create({ courseName, price });
  if (course) {
    res.status(200).json({ mgs: "Course Added succesfully" });
  } else [res.status(500).json({ msg: "DB issue" })];
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  if (courses) {
    res.status(200).json({ courses: courses });
  } else {
    res.status(500).json({ msg: "internal server errror" });
  }
});

module.exports = router;
