const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Title must be at least 2 character long"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: [1, "Title must be at least 2 character long"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "in progress", "review", "completed"],
        message: "`{VALUE}` is not a valid status",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;
