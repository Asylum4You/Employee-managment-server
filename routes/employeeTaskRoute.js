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
router.get("/employee-task", verifyJWT, getEmployeeTasksRecords);
router.get("/employee-task/:uid", verifyJWT, getEmployeeTaskById);
router.delete("/employee-task/:id", verifyJWT, deleteTask);
router.put("/employee-task/:id", verifyJWT, updateTask);
router.get("/employee/overview", verifyJWT, getEmployeeOverview);

module.exports = router;
