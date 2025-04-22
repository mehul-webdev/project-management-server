const {
  addNewProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
  getProjectNames,
} = require("../controllers/project");

const router = require("express").Router();

// Add project
router.post("/new-project", addNewProject);
router.patch("/update-project", updateProject);
router.delete("/delete-project/:id", deleteProject);
router.get("/get-all-projects", getAllProjects);
router.get("/get-project/:id", getProject);
router.get("/get-project-names", getProjectNames);

module.exports = router;
