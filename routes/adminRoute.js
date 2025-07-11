const express = require("express");
const {
  getAllEmployees,
  toggleVerify,
  getEmployeeAndPayments,
} = require("../controller/hr.controller");

const router = express.Router();

router.get("/employees", getAllEmployees);
router.patch("/employee/:id/verify", toggleVerify);
router.get('/employee-details/:id', getEmployeeAndPayments);

module.exports = router;
