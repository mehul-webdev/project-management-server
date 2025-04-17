const express = require("express");
const router = express.Router();

const {
  handleSignUp,
  handleSignIn,
  handleLoginStatus,
  handleUserLogout,
} = require("../controllers/authentication");
const { validateToken } = require("../middlewares/authorizationMiddleware");

router.post("/sign-up", handleSignUp);
router.post("/sign-in", handleSignIn);
router.get("/status", validateToken, handleLoginStatus);
router.get("/logout", validateToken, handleUserLogout);

module.exports = router;
