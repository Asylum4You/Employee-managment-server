const EmployeeTask = require("../model/EmployeeTask");

exports.addEmployeeTask = async (req, res) => {
  try {
    const { task, hours, date, userUID } = req.body;

    const newTask = new EmployeeTask({
      task,
      hours,
      date,
      userUID,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
  }
};

exports.getEmployeeTasks = async (req, res) => {
  try {
    const { uid } = req.params;
    const tasks = await EmployeeTask.find({ uid }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

