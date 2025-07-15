const express = require("express");
const {
  toggleVerify,
  getEmployeeAndPayments,
  getAllEmployeesWithCurrentPayments,
  getAllEmployees,
  getHrOverviewData,
} = require("../controller/hr.controller");

const router = express.Router();

router.patch("/employee/:id/verify", toggleVerify);
router.get("/employees", getAllEmployees);
router.get("/hr/employees-with-payments", getAllEmployeesWithCurrentPayments);
router.get("/employee-details/:id", getEmployeeAndPayments);
router.get("/hr/overview", getHrOverviewData);

module.exports = router;
