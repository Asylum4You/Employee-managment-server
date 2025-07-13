const express = require("express");
const {
  toggleVerify,
  getEmployeeAndPayments,
  getAllEmployeesWithCurrentPayments,
  getAllEmployees,
} = require("../controller/hr.controller");

const router = express.Router();

router.patch("/employee/:id/verify", toggleVerify);
router.get("/employees", getAllEmployees);
router.get("/hr/employees-with-payments", getAllEmployeesWithCurrentPayments);
router.get("/employee-details/:id", getEmployeeAndPayments);

module.exports = router;
