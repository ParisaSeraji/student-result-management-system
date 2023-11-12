const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  score: {
    type: String,
    enum: ["A", "B", "C", "D", "E", "F"],
    required: true,
  },
});

module.exports = mongoose.model("Result", resultSchema);
