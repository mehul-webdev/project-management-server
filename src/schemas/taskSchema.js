const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Tasks", taskSchema);

module.exports = TaskModel;
