const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  await Admin.create({
    username: username,
    password: password,
  });
  res.json({ msg: "Admin created successfully through signup" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const courseName = req.body.courseName;
  const price = req.body.price;
  const courses = await Course.create({
    courseName: courseName,
    price: price,
  });
  res.json({ status: "200", msg: "Course Added succesfully" });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  res.json({ status: "200", cousrse: allCourses });
});

module.exports = router;
