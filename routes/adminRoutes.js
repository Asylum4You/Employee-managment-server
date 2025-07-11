const express = require("express");
const {
  getAllEmployees,
  updateEmployeeSalary,
} = require("../controller/admin.controller");

const router = express.Router();

router.get("/admin/employees", getAllEmployees);
router.get("/admin/employees/:id/salary", updateEmployeeSalary);

module.exports = router;
