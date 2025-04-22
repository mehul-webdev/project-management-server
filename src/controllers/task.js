const TaskModel = require("../schemas/taskSchema");

const createTask = async (req, res, next) => {
  try {
    const data = req.data;

    const task = await TaskModel.create({
      taskName: "Testing",
    });

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    err.message = "Failed to create task";
    next(err);
  }
};
const updateTask = async (req, res) => {};
const deleteTask = async (req, res) => {};
const getTasks = async (req, res) => {};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
};
