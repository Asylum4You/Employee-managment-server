const express = require("express");
const {
  addEmployeeTask,
  getEmployeeTasks,
  deleteTask,
  updateTask,
} = require("../controller/EmployeeTask.controller");
const router = express.Router();

router.post("/employee-task", addEmployeeTask);
router.get("/employee-task/:uid", getEmployeeTasks);
router.delete("/employee-task/:id", deleteTask);
router.put("/employee-task/:id", updateTask);

module.exports = router;
