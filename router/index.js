const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

// localhost:3000/api
router.use("/api", apiRouter);

router.use((req, res) => {
  return res.status(404).json({ Success: false, message: "Route not found" });
});

module.exports = router;
