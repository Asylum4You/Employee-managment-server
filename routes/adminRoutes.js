const express = require("express");
const {
  getAllEmployees,
  updateEmployeeSalary,
  makeEmployeeToHr,
} = require("../controller/admin.controller");

const router = express.Router();

router.get("/admin/employees", getAllEmployees);
router.patch("/admin/employees/:id/salary", updateEmployeeSalary);
router.patch("/admin/employees/:id/role", makeEmployeeToHr);

module.exports = router;
