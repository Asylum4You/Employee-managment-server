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
const { verifyJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin/employees", verifyJWT, getAllEmployees);
router.patch("/admin/employees/:id/salary", verifyJWT, updateEmployeeSalary);
router.patch("/admin/employees/:id/role", verifyJWT, makeEmployeeToHr);
router.patch("/admin/employees/:id/fire", verifyJWT, firedEmployees);
router.get(
  "/admin/employees/payment-requests",
  verifyJWT,
  getAllPaymentRequests
);
router.get("/admin/overview", verifyJWT, getAdminOverview);
router.get("/admin/user-growth", verifyJWT, getMonthlyUserGrowth);

module.exports = router;
