const express = require("express");
const {
  registerUser,
  getUserByEmail,
  checkUserExist,
} = require("../controller/user.controller");

const router = express.Router();

router.post("/users/register", registerUser);
router.get("/users/:email", getUserByEmail);
router.get("/users/:email/check-exist", checkUserExist);

module.exports = router; 
