const PaymentRequest = require("../model/paymentRequest");
const User = require("../model/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentRequest = async (req, res) => {
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

// Get individual payment history;
exports.getPaymentHistory = async (req, res) => {
  const uid = req.user.uid;

  try {
    const employee = await User.findOne({ uid });
    if (!employee)
      return res.status(404).json({ message: "employee not found" });


    const paymentHistory = await PaymentRequest.find({
      employeeId: employee._id,
    });
    console.log(paymentHistory);
    res.status(200).json(paymentHistory);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// GET /api/admin/payments
exports.getAllPaymentRequests = async (req, res) => {
  try {
    const payments = await PaymentRequest.find().sort({ createdAt: -1 });

    // if (payments.paymentStatus === "Paid") {
    //   return res.status(400).json({ error: "Already paid" });
    // }

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
  console.log(id, transactionId, date);

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
