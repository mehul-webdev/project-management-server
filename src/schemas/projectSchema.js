const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    projectDescription: {
      type: String,
      required: true,
    },
    projectTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
      },
    ],
    projectStartDate: {
      type: Date,
      required: true,
    },
    projectEndDate: {
      type: Date,
      required: true,
    },
    projectStatus: {
      type: String,
      enum: ["inprogress", "notStarted", "completed"],
      default: "notStarted",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", projectSchema);
module.exports = ProjectModel;
