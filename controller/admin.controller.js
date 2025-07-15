const User = require("../model/User");
const PaymentRequest = require("../model/paymentRequest");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ isVerified: true }).sort({
      isFired: 1,
    });
    if (!employees)
      return res.status(404).json({ message: "employees not found" });

    res.status(201).json(employees);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Internal server error" });
  }
};

exports.updateEmployeeSalary = async (req, res) => {
  const id = req.params.id;
  const salary = req.body.salary;

  try {
    const employee = await User.findById(id);
    if (!employee)
      return res.status(404).json({ message: "employee not found" });
    employee.salary = salary;
    await employee.save();
    res.status(201).json({ message: "successfully salary updated", employee });
  } catch (error) {
    res.status(404).json({ message: "Internal server error" });
  }
};

exports.makeEmployeeToHr = async (req, res) => {
  const id = req.params.id;
  const role = req.body.role;

  try {
    const employee = await User.findById(id);
    if (!employee)
      return res.status(404).json({ message: "employee not found" });

    employee.role = role;
    await employee.save();
    res
      .status(201)
      .json({ message: "successfully promote employee to hr", employee });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.firedEmployees = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await User.findById(id);
    if (!employee)
      return res.status(404).json({ message: "employee not found" });
    employee.isFired = true;
    await employee.save();

    res.status(201).json({ message: "successfully employee fired", employee });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getAdminOverview = async (req, res) => {
  try {
    const [totalUsers, admins, hrs, employees] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "hr" }),
      User.countDocuments({ role: "employee" }),
    ]);

    // Get current month & year
    const today = new Date();
    const month = today
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const year = today.getFullYear();

    const paidPayments = await PaymentRequest.aggregate([
      {
        $match: {
          month,
          year,
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$salary" },
        },
      },
    ]);

    const monthlySalary = paidPayments[0]?.total || 0;

    res.json({
      totalUsers,
      admins,
      hrs,
      employees,
      monthlySalary,
    });
  } catch (error) {
    console.error("Admin overview fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch admin overview" });
  }
};



exports.getMonthlyUserGrowth = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const growth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    const fullMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const result = fullMonths.map((month, index) => {
      const match = growth.find((item) => item._id === index + 1);
      return {
        month,
        count: match ? match.count : 0,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user growth data." });
  }
};
