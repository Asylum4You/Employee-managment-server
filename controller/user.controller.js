const User = require("../model/User");

// Controller function for user registration/signup
const registerUser = async (req, res) => {
  const {
    name,
    email,
    role,
    bank_account_no,
    designation,
    salary,
    image,
    uid,
    isVerified,
    isFired,
  } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({
      name,
      email,
      role,
      bank_account_no,
      designation,
      salary,
      image,
      isFired,
      isVerified,
      uid,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message and the new user data (excluding the password)
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        bank_account_no: newUser.bank_account_no,
        designation: newUser.designation,
        salary: newUser.salary,
        image: newUser.image,
        isFired: newUser.isFired,
        isVerified: newUser.isVerified,
        uid: newUser.uid,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
};

const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

const checkUserExist = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email)
    const user = await User.findOne({ email });
    if (user) {
     return res.json({ exists: true, user });
    }

    return res.json({ exists: false });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserData = async (req, res) => {
  const uid = req.params.uid;
  
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "user not fund" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  getUserByEmail,
  checkUserExist,
  getUserData,
};
 