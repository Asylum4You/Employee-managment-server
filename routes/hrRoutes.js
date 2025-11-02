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
const { verifyJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.patch("/employee/:id/verify", verifyJWT, toggleVerify);
router.get("/employees", verifyJWT, getAllEmployees);
router.get(
  "/hr/employees-with-payments",
  verifyJWT,
  getAllEmployeesWithCurrentPayments
);
router.get("/employee-details/:id", verifyJWT, getEmployeeAndPayments);
router.get("/hr/overview", verifyJWT, getHrOverviewData);
router.get("/hr/payment-summary", verifyJWT, getHrPaymentSummary);
router.get("/hr/payroll-requests-stats", verifyJWT, getPayrollRequestStats);
router.get("/hr/latest-payments", verifyJWT, getLatestPayments);

module.exports = router;
