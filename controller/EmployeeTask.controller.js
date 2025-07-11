const EmployeeTask = require("../model/EmployeeTask");

exports.addEmployeeTask = async (req, res) => {
  try {
    const { task, hours, date, userUID, employeeName, month } = req.body;

    const newTask = new EmployeeTask({
      task,
      hours,
      date,
      userUID,
      employeeName,
      month,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
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
    const tasks = await EmployeeTask.find({ userUID: uid }).sort({
      createdAt: -1,
    });

    if (!tasks) return res.status(404).json({ message: "Task not found" });

    res.status(201).json(tasks);
  } catch (error) {
    console.error(error);
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
