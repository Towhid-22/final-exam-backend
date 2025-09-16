const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const courseRouter = require("./courses");
const successRouter = require("./successStory");

// localhost:3000/api/auth
router.use("/auth", authRouter);
// localhost:3000/api/courses
router.use("/courses", courseRouter);
// localhost:3000/api/success-stories
router.use("/success-stories", successRouter);
module.exports = router;
