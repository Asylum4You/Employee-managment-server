const PaymentRequest = require("../model/paymentRequest");
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
  } = req.body;

  try {
    const paymentRequest = new PaymentRequest({
      employeeId,
      employeeName,
      employeeEmail,
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

exports.getPaymentsForMonth = async (req, res) => {
  try {
    const month = req.query.month.toLowerCase();
    const year = parseInt(req.query.year);
    const payments = await PaymentRequest.find({
      month,
      year,
      paymentStatus: { $in: ["Pending", "Paid"] },
    });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
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
exports.paySalary = async (req, res) => {
  const { paymentRequestId } = req.params;

  try {
    const paymentRequest = await PaymentRequest.findById(paymentRequestId);
    if (!paymentRequest) return res.status(404).json({ error: "Payment request not found" });
    if (paymentRequest.paymentStatus === "Paid") return res.status(400).json({ error: "Already paid" });

    // ✅ Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentRequest.salary * 100, // Stripe uses cents
      currency: "usd",
      payment_method_types: ["card"],
      description: `Salary for ${paymentRequest.employeeName} - ${paymentRequest.month} ${paymentRequest.year}`,
    });

    // ✅ Update the DB after successful payment simulation
    paymentRequest.paymentStatus = "Paid";
    paymentRequest.paymentDate = new Date();
    await paymentRequest.save();

    res.status(200).json({
      message: "Payment successful",
      paymentIntent,
      updatedPayment: paymentRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
};

