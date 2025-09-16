const express = require("express");
const upload = require("../../helpers/uploadimage");
const {
  addSuccessStoryController,
  getAllSuccessStoriesController,
} = require("../../controllers/successStoryController");
const router = express.Router();
// localhost:3000/api/success-stories/success-story
router.post("/success-story", upload.single("storyVideo"), addSuccessStoryController);
// localhost:3000/api/success-stories/all-success-story
router.get("/all-success-story", getAllSuccessStoriesController);

module.exports = router;
