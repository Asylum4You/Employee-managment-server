const Contact = require("../model/Contact");

exports.contactMessage = async (req, res) => {
  try {
    const { email, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMessage = new Contact({ email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
