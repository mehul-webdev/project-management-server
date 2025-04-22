const ProjectModel = require("../schemas/projectSchema");

const addNewProject = async (req, res, next) => {
  try {
    const project = await ProjectModel.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.json({
      message: "Project Added Successfully",
      id: project._id,
      success: true,
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
};

// Below function is to get user projects based on the id
const getProjectNames = async (req, res, next) => {
  try {
    const { id } = req.user;
    const projects = await ProjectModel.find({
      projectMembers: id,
    }).select("_id projectName");
    res.json({
      success: true,
      data: projects,
    });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await ProjectModel.findById(id)
      .populate({
        path: "projectMembers",
        select: "-password",
      })
      .populate("projectTasks")
      .populate("createdBy");

    res.json({
      success: true,
      data: project,
    });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

const updateProject = async () => {};
const deleteProject = async () => {};
const getAllProjects = async () => {};

module.exports = {
  addNewProject,
  getProjectNames,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
};
