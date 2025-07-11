const User = require("../model/User");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ isVerified: true, isFired: false });
    if (!employees)
      return res.status(404).json({ message: "employees not found" });

    res.status(201).json(employees);
  } catch (error) {
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
    res.status(201).json({message: 'successfully salary updated', employee})
  } catch (error) {
    res.status(404).json({ message: "Internal server error" });
  }
};
