const router = require("express").Router();
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} = require("../controllers/task");

router.post("/create-task", createTask);

module.exports = router;
