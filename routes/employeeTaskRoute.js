const express = require("express");
const {
  addEmployeeTask,
  getEmployeeTasksRecords,
  deleteTask,
  updateTask,
  getEmployeeTaskById,
  getEmployeeOverview,
} = require("../controller/EmployeeTask.controller");
const { verifyJWT } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/employee-task", verifyJWT, addEmployeeTask);
router.get("/employee-task", getEmployeeTasksRecords);
router.get("/employee-task/:uid", getEmployeeTaskById);
router.delete("/employee-task/:id", deleteTask);
router.put("/employee-task/:id", updateTask);
router.get("/employee/overview", verifyJWT, getEmployeeOverview);

module.exports = router;
