const express = require("express");
const {
  getUsers,
  checkUserExists,
  handleAddmembers,
} = require("../controllers/users");
const router = express.Router();

router.get("/", getUsers);
router.get("/check-user-exists/:email", checkUserExists);

module.exports = router;
