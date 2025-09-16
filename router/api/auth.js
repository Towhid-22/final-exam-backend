const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
} = require("../../controllers/authController");
const router = express.Router();

// localhost:3000/api/auth/signup
router.post("/signup", signupController);
// localhost:3000/api/auth/login
router.post("/login", loginController);
// localhost:3000/api/auth/logout
router.post("/logout", logoutController);

module.exports = router;
