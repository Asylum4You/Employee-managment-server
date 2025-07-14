const User = require("../model/User");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ isVerified: true, }).sort({isFired: 1});
    if (!employees)
      return res.status(404).json({ message: "employees not found" });

    res.status(201).json(employees);
  } catch (error) {
    console.log(error)
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
