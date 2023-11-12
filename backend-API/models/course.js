const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
});

// Removing references in the "results" collection after deleting a course
courseSchema.pre("remove", async function (next) {
  const course = this;
  await Result.updateMany(
    { courseId: course._id },
    { $set: { courseId: null } }
  );

  next();
});

module.exports = mongoose.model("Course", courseSchema);
