const express = require("express");
const {
  getAllEmployees,
  updateEmployeeSalary,
  makeEmployeeToHr,
  firedEmployees,
  getAdminOverview,
  getMonthlyUserGrowth,
} = require("../controller/admin.controller");
const {
  getAllPaymentRequests,
} = require("../controller/paymentRequest.controller");

const router = express.Router();

router.get("/admin/employees", getAllEmployees);
router.patch("/admin/employees/:id/salary", updateEmployeeSalary);
router.patch("/admin/employees/:id/role", makeEmployeeToHr);
router.patch("/admin/employees/:id/fire", firedEmployees);
router.get("/admin/employees/payment-requests", getAllPaymentRequests);
router.get("/admin/overview", getAdminOverview);
router.get("/admin/user-growth", getMonthlyUserGrowth);

module.exports = router;
