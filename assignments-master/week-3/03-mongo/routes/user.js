const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.create({
    username: username,
    password: password,
  });
  if (user) {
    res.status(200).json({ msg: "User created succesufully" });
  } else {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  res.json({ status: "200", cousrse: allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseid = req.params.courseId;
  const username = req.headers.username;
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseid,
      },
    }
  );
  res.json({ msg: "Addedcourse" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({ username: req.headers.username });
  const courses = await Course.find({ _id: { $in: user.purchasedCourses } });
  res.json({ courses: courses });
});

module.exports = router;
