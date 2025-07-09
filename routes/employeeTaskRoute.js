const express = require("express");
const {
  addEmployeeTask,
  getEmployeeTasks,
} = require("../controller/EmployeeTask.controller");
const router = express.Router();

router.post("/employee-task", addEmployeeTask);
router.get("/employee-task/:uid", getEmployeeTasks);

module.exports = router;
