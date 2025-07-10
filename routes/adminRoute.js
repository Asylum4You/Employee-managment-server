const express = require("express");
const {
  getAllEmployees,
  toggleVerify,
} = require("../controller/hr.controller");

const router = express.Router();

router.get("/employees", getAllEmployees);
router.patch("/employee/:id/verify", toggleVerify);

module.exports = router;
