const express = require("express");
const {
  toggleVerify,
  getEmployeeAndPayments,
  getAllEmployeesWithCurrentPayments,
  getAllEmployees,
  getHrOverviewData,
  getHrPaymentSummary,
  getPayrollRequestStats,
  getLatestPayments,
} = require("../controller/hr.controller");

const router = express.Router();

router.patch("/employee/:id/verify", toggleVerify);
router.get("/employees", getAllEmployees);
router.get("/hr/employees-with-payments", getAllEmployeesWithCurrentPayments);
router.get("/employee-details/:id", getEmployeeAndPayments);
router.get("/hr/overview", getHrOverviewData);
router.get('/hr/payment-summary', getHrPaymentSummary);
router.get("/hr/payroll-requests-stats", getPayrollRequestStats);
router.get("/hr/latest-payments", getLatestPayments);



module.exports = router;
