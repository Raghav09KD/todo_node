const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskcontroller");
const authenticate = require("../middleware/authenticate");

// Route for adding a task
router.post("/add", authenticate, taskController.addTask);
router.get("/list", authenticate, taskController.listTasks);
router.get("/list/:taskId", authenticate, taskController.getTaskById);
router.put("/:taskId", authenticate, taskController.updateTask);
router.delete("/soft-delete/:taskId",authenticate,taskController.softDeleteTask);

module.exports = router;
