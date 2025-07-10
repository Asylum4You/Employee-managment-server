const User = require("../model/User");

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
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.toggleVerify = async (req, res) => {
  const { id } = req.params;
  const { isVerified } = req.body;

  // Check if the 'isVerified' field is provided
  if (typeof isVerified !== 'boolean') {
    return res.status(400).json({ message: "The 'isVerified' field must be a boolean." });
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

    res.json({ message: "Verification status updated successfully", user: updatedUser });
  } catch (error) {
    console.error('Error updating verification status:', error);
    res.status(500).json({ message: "Server error. Unable to update verification status." });
  }
};

