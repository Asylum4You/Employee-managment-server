const express = require("express");
const {
  getAllEmployees,
  updateEmployeeSalary,
  makeEmployeeToHr,
  firedEmployees,
} = require("../controller/admin.controller");
const { getAllPaymentRequests } = require("../controller/paymentRequest.controller");

const router = express.Router();

router.get("/admin/employees", getAllEmployees);
router.patch("/admin/employees/:id/salary", updateEmployeeSalary);
router.patch("/admin/employees/:id/role", makeEmployeeToHr);
router.patch("/admin/employees/:id/fire", firedEmployees );
router.get("/admin/employees/payment-requests", getAllPaymentRequests)

module.exports = router;
