const express = require("express");
const {
  addEmployeeTask,
  getEmployeeTasksRecords,
  deleteTask,
  updateTask,
  getEmployeeTaskById,
} = require("../controller/EmployeeTask.controller");
const router = express.Router();

router.post("/employee-task", addEmployeeTask);
router.get("/employee-task", getEmployeeTasksRecords);
router.get("/employee-task/:uid", getEmployeeTaskById);
router.delete("/employee-task/:id", deleteTask);
router.put("/employee-task/:id", updateTask);

module.exports = router;
