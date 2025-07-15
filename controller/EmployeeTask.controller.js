const EmployeeTask = require("../model/EmployeeTask");
const User = require("../model/User");
const PaymentRequest = require("../model/paymentRequest");

exports.addEmployeeTask = async (req, res) => {
  const { task, hours, date, employeeName, month } = req.body;
  const uid = req.user.uid;
  console.log(uid);
  try {
    const employee = await User.findOne({ uid });
    if (!employee)
      return res.status(404).json({ message: "employee not found" });

    const newTask = new EmployeeTask({
      task,
      hours,
      date,
      uid,
      employeeName,
      employeeId: employee._id,
      month,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to add task", error: error.message });
  }
};

exports.getEmployeeTasksRecords = async (req, res) => {
  const { employeeId, month } = req.query;
  const filter = { ...(employeeId ? { employeeId } : {}), month };

  try {
    const tasks = await EmployeeTask.find(filter).sort({
      createdAt: -1,
    });
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

exports.getEmployeeTaskById = async (req, res) => {
  try {
    const { uid } = req.params;
    const tasks = await EmployeeTask.find({ uid }).sort({
      createdAt: -1,
    });

    if (!tasks) return res.status(404).json({ message: "Task not found" });

    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await EmployeeTask.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

// PUT /employee-task/:id
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task, hours, date } = req.body;

    const updatedTask = await EmployeeTask.findByIdAndUpdate(
      taskId,
      { task, hours, date },
      { new: true } // return updated doc
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

exports.getEmployeeOverview = async (req, res) => {
  try {
    const userUID = req.user.uid;

    const user = await User.findOne({ uid: userUID });
    if (!user) return res.status(404).json({ message: "User not found" });

    const currentDate = new Date();
    const month = currentDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const year = currentDate.getFullYear();

    // ✅ Get current month's payment
    const currentPayment = await PaymentRequest.findOne({
      employeeEmail: user.email,
      month,
      year,
      paymentStatus: "Paid",
    });

    const totalPayment = await PaymentRequest.find({
      employeeEmail: user.email,
      paymentStatus: "Paid",
    });

    // ✅ Get all pending payments
    const pendingPayments = await PaymentRequest.find({
      employeeEmail: user.email,
      paymentStatus: "Pending",
    });

    // ✅ Total work hours this month
    const totalHours = await EmployeeTask.aggregate([
      {
        $match: {
          uid: user.uid, // ✅ this is the correct field
          $expr: {
            $and: [
              { $eq: [{ $month: "$date" }, currentDate.getMonth() + 1] },
              { $eq: [{ $year: "$date" }, currentDate.getFullYear()] },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$hours" },
        },
      },
    ]);

    // ✅ Recent 5 payments
    const recentPayments = await PaymentRequest.find({
      employeeEmail: user.email,
      paymentStatus: "Paid",
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      salaryThisMonth: currentPayment?.salary || 0,
      totalPayment,
      totalWorkHours: totalHours[0]?.total || 0,
      pendingPayments: pendingPayments.length,
      isVerified: user.isVerified,
      recentPayments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
