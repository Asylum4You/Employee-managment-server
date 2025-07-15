const User = require("../model/User");
const PaymentRequest = require("../model/paymentRequest");

exports.getAllEmployees = async (req, res) => {
  try {
    // ✅ Check role (you must add the role info to req.user in auth middleware)
    // if (req.user.role !== "employee") {
    //   return res.status(403).json({ message: "Forbidden: Access denied" });
    // }

    // ✅ Fetch employee data (you can customize fields)
    const employees = await User.find({ role: "employee" });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllEmployeesWithCurrentPayments = async (req, res) => {
  try {
    // Fetch all employees
    const employees = await User.find({ role: "employee" });

    // Get current month and year (if not sent from front-end, fallback to server date)
    const month = (
      req.query.month || new Date().toLocaleString("default", { month: "long" })
    ).toLowerCase();
    const year = parseInt(req.query.year) || new Date().getFullYear();

    // Fetch this month's payments (Pending or Paid)
    const payments = await PaymentRequest.find({
      month,
      year,
      paymentStatus: { $in: ["Pending", "Paid"] },
    });

    // Send both in a single response
    res.status(200).json({ employees, payments });
  } catch (error) {
    console.error("Failed to fetch employees or payments", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.toggleVerify = async (req, res) => {
  const { id } = req.params;
  const { isVerified } = req.body;

  // Check if the 'isVerified' field is provided
  if (typeof isVerified !== "boolean") {
    return res
      .status(400)
      .json({ message: "The 'isVerified' field must be a boolean." });
  }

  try {
    // Find the user by ID and update their verification status
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isVerified },
      { new: true } // This option returns the updated document
    );

    // If no user is found with the provided ID
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Verification status updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating verification status:", error);
    res
      .status(500)
      .json({ message: "Server error. Unable to update verification status." });
  }
};

exports.getEmployeeAndPayments = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // 1. Get the employee
    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2. Get payment data for that employee
    const payments = await PaymentRequest.find({ employeeId });

    // 3. Return both in one response
    res.status(200).json({
      employee,
      payments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller: getHrOverviewData
exports.getHrOverviewData = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: "employee" });
    const verifiedEmployees = await User.countDocuments({
      role: "employee",
      isVerified: true,
    });
    const pendingVerifications = await User.countDocuments({
      role: "employee",
      isVerified: false,
    });
    const pendingSalaryRequests = await PaymentRequest.countDocuments({
      paymentStatus: "Pending",
    });

    res.json({
      totalEmployees,
      verifiedEmployees,
      pendingVerifications,
      pendingSalaryRequests,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch HR overview data" });
  }
};




exports.getHrPaymentSummary = async (req, res) => {
  try {
    const summary = await PaymentRequest.aggregate([
      {
        $group: {
          _id: { month: "$month", year: "$year", status: "$paymentStatus" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to get payment summary" });
  }
};
