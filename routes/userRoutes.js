const express = require("express");
const { registerUser } = require("../controller/user.controller");

const router = express.Router();

router.post("/user/register", registerUser);

module.exports = router;
