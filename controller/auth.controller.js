const admin = require("../config/firebaseAdmin");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

exports.login = async (req, res) => {
  try {
    const firebaseToken = req.headers.authorization?.split(" ")[1];
    if (!firebaseToken)
      return res.status(401).json({ message: "Unauthorized" });

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(401).json({ message: "user not found" });

    const payload = {
      uid: decoded.uid,
      email: decoded.email,
      role: user.role,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
    });
    res.json({ message: "Login successfully" });
  } catch (error) {}
};

exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  res.json({ message: "Logged out successfully" });
};
