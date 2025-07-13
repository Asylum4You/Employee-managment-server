const mongoose = require("mongoose");

const paymentRequestSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    employeeEmail: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Rejected"],
      default: "Pending", // Default status is "Pending"
    },
    paymentDate: {
      type: Date,
      default: null, // Will be updated when payment is made
    },
    paymentRequestedBy: {
      type: String, // HR or Admin
      required: true,
    },
    transactionId: { type: String, default: null },
  },
  { timestamps: true }
);

const PaymentRequest = mongoose.model("PaymentRequest", paymentRequestSchema);
module.exports = PaymentRequest;
