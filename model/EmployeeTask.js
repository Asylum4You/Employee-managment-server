const mongoose = require("mongoose");

const employeeTaskSchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true },
    task: {
      type: String,
      required: true,
      enum: [
        "Sales",
        "Support",
        "Content",
        "Paper-work",
        "Marketing",
        "Development",
        "Design",
        "Meeting",
        "Research",
        "Training",
        "Testing",
        "Data Entry",
        "Customer Feedback",
        "Documentation",
        "Bug Fixing",
        "Inventory",
        "Social Media",
        "Recruitment",
        "Planning",
      ],
    },
    hours: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
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
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeTask", employeeTaskSchema);
