const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Removing references in the "results" collection after deleting a student
studentSchema.pre("remove", async function (next) {
  const student = this;
  await Result.updateMany(
    { studentId: student._id },
    { $set: { studentId: null } }
  );

  next();
});

module.exports = mongoose.model("Student", studentSchema);
