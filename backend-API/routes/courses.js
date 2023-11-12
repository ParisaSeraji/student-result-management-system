const express = require("express");
const router = express.Router();
const Course = require("../models/course");

// Creating a new course
router.post("/create", async (req, res) => {
  const { courseName } = req.body;
  const course = new Course({ courseName });

  try {
    const newCourse = await course.save();
    res
      .status(201)
      .json({ message: "Student added successfully", course: newCourse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Getting a list of all courses
router.get("/list", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deleting a course
router.delete("/delete/:id", getCourse, async (req, res) => {
  try {
    await res.course.deleteOne({ _id: req.params.id });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getCourse(req, res, next) {
  let course;
  try {
    course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "cannot find course!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.course = course;
  next();
}
module.exports = router;
