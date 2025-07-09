const mongoose = require("mongoose");

const employeeTaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    enum: ["Sales", "Support", "Content", "Paper-work"],
  },
  hours: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  userUID: {
    type: String,
    required: true,
    ref: "User", // Reference to the User collection (optional if not populating)
  },
}, { timestamps: true });

module.exports = mongoose.model("EmployeeTask", employeeTaskSchema);
