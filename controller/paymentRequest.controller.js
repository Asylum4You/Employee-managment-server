const PaymentRequest = require("../model/paymentRequest");
const User = require("../model/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentRequest = async (req, res) => {
  if (req.user.role !== "hr")
    return res.status(403).json({ message: "Forbidden: Access denied" });
  const {
    employeeId,
    employeeName,
    employeeEmail,
    salary,
    bankAccount,
    month,
    year,
    paymentRequestedBy,
    designation,
  } = req.body;

  try {
    const paymentRequest = new PaymentRequest({
      employeeId,
      employeeName,
      employeeEmail,
      designation,
      salary,
      bankAccount,
      month,
      year,
      paymentRequestedBy,
    });

    await paymentRequest.save();

    res.status(201).json({
      message: "Payment request created successfully",
      paymentRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error. Unable to create payment request." });
  }
};

exports.getPaymentHistory = async (req, res) => {
  const uid = req.user.uid;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  if (req.user.role !== "employee")
    return res.status(403).json({ message: "Forbidden: Access denied" });

  try {
    const employee = await User.findOne({ uid });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const total = await PaymentRequest.countDocuments({
      employeeId: employee._id,
    });

    const paymentHistory = await PaymentRequest.find({
      employeeId: employee._id,
    })
      .sort({ paymentDate: -1 }) // optional: sort latest first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: paymentHistory,
    });
  } catch (error) {
    console.error("Error in getPaymentHistory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllPaymentRequests = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden: Access denied" });
  try {
    const payments = await PaymentRequest.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment requests",
      error: error.message,
    });
  }
};

// Admin pays salary through Stripe
exports.createPaymentIntent = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden: Access denied" });
  const { amount } = req.body;
  const amountInCents = amount * 100;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
};

// update the payment status of employee;

exports.updatePaymentStatus = async (req, res) => {
  const transactionId = req.body.transactionId;
  const date = req.body.date;
  const id = req.params.id;

  try {
    const payment = await PaymentRequest.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment data not found" });
    }
    payment.paymentStatus = "Paid";
    payment.transactionId = transactionId;
    payment.paymentDate = date;
    await payment.save();
    res.status(200).json({ message: "Payment status updated", payment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
