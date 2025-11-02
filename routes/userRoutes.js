const express = require("express");
const {
  registerUser,
  getUserByEmail,
  checkUserExist,
  getUserData,
} = require("../controller/user.controller");

const router = express.Router();

router.post("/users/register", registerUser);
router.get("/users/:email", getUserByEmail);
router.get("/users/:email/check-exist", checkUserExist);
router.get("/user/:uid", getUserData)

module.exports = router;  
