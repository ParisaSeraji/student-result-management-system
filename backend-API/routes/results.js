const express = require("express");
const router = express.Router();
const Result = require("../models/result");
const Course = require("../models/course");
const Student = require("../models/student");

// Creating a new result
router.post("/create", getResult, async (req, res) => {
  // Checking if both student and course are valid
  if (!res.student || !res.course) {
    return res.status(400).json({ error: "Invalid student or course" });
  }

  const result = new Result({
    courseId: res.course._id,
    studentId: res.student._id,
    score: res.score,
  });
  try {
    const newResult = await result.save();

    // Populating the studentId and courseId fields in the response body
    await Result.populate(newResult, {
      path: "studentId",
      select: "firstName lastName",
    });
    await Result.populate(newResult, {
      path: "courseId",
      select: "courseName",
    });

    res.status(201).json({
      message: "Result added successfully",
      result: newResult,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Getting a list of all results
router.get("/list", async (req, res) => {
  try {
    const results = await Result.find({
      $or: [{ studentId: { $ne: null } }, { courseId: { $ne: null } }],
    })
      .populate("courseId", "courseName")
      .populate("studentId", "firstName lastName");

    // Filtering out results with unknown students or courses
    const filteredResults = results.filter(
      (result) => result.studentId && result.courseId
    );

    const mappedResults = await Promise.all(
      filteredResults.map(async (result) => {
        if (!result.studentId || !result.courseId) {
          return null;
        }

        const populatedResult = await Result.populate(result, {
          path: "studentId",
          select: "firstName lastName",
        });

        await Result.populate(populatedResult, {
          path: "courseId",
          select: "courseName",
        });

        return {
          _id: populatedResult._id,
          studentName: `${populatedResult.studentId.firstName} ${populatedResult.studentId.lastName}`,
          courseName: populatedResult.courseId.courseName,
          score: populatedResult.score,
        };
      })
    );

    const finalResults = mappedResults.filter((result) => result !== null);

    res.json(finalResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getResult(req, res, next) {
  const { studentName, courseName, score } = req.body;
  let student, course;

  const [firstName, lastName] = studentName.split(" ");

  try {
    student = await Student.findOne({ firstName, lastName });
    course = await Course.findOne({ courseName });
    if (!student) {
      return res.status(404).json({ error: "Invalid student!" });
    }

    if (!course) {
      return res.status(400).json({ error: "Invalid course" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.student = student;
  res.course = course;
  res.score = score;
  next();
}

module.exports = router;
