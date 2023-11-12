const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// Creating a new student
router.post("/create", async (req, res) => {
  const { firstName, lastName, dob, email } = req.body;

  // Validation
  if (!firstName || !lastName || !dob || !email) {
    return res.status(400).json({ error: "All controls must be filled" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Date of birth validation
  const currentDate = new Date();
  const studentDob = new Date(dob);
  const ageDiff = currentDate.getFullYear() - studentDob.getFullYear();
  if (ageDiff < 10) {
    return res
      .status(400)
      .json({ error: "Student must be at least 10 years old" });
  }

  const student = new Student({
    firstName,
    lastName,
    dob: studentDob,
    email,
  });

  try {
    const newStudent = await student.save();
    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Getting a list of all students
router.get("/list", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deleting a student
router.delete("/delete/:id", getStudent, async (req, res) => {
  try {
    await res.student.deleteOne({ _id: req.params.id });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "cannot find student!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.student = student;
  next();
}

module.exports = router;
