const express = require("express");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      require: true,
    },
    projectMembers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    projectDescription: {
      type: String,
      require: true,
    },
    projectTasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
    },
    projectStartDate: {
      type: Date,
      require: true,
    },
    projectEndDate: {
      type: Date,
      require: true,
    },
    projectStatus: {
      type: String,
      enum: ["inprogress", "not started", "completed"],
      default: "inprogress",
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", projectSchema);
module.exports = ProjectModel;
