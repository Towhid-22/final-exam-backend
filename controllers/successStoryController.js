const successModel = require("../models/successModel");

const addSuccessStoryController = async (req, res) => {
  try {
    const { studentName, courseName } = req.body;

    const storyVideo = req.file
      ? `${process.env.SERVER_URL}/uploads/${req.file.filename}`
      : null;

    const successStory = new successModel({
      studentName,
      courseName,
      storyVideo,
    });

    await successStory.save();

    res.status(201).json({
      success: true,
      message: "Success story added successfully",
      data: successStory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Get All Success Stories
const getAllSuccessStoriesController = async (req, res) => {
  try {
    const stories = await successModel.find({});

    if (stories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No success stories found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Success stories retrieved successfully",
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  addSuccessStoryController,
  getAllSuccessStoriesController,
};

module.exports = {
  addSuccessStoryController,
  getAllSuccessStoriesController,
};
