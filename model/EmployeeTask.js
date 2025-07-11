const mongoose = require("mongoose");

const employeeTaskSchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true },
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
    month: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
      ref: "User", // Reference to the User collection (optional if not populating)
    },
    employeeId: {
      type: String,
      required: true,
      ref: 'User',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeTask", employeeTaskSchema);
