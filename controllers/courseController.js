const courseModel = require("../models/courseModel");
const fs = require("fs");
const path = require("path");

// Add Course
const addCourseController = async (req, res) => {
  try {
    const { title, description, price, instructor, duration, category } =
      req.body;

    const newCourse = new courseModel({
      title,
      description,
      price,
      instructor,
      duration,
      category,
      thumbnailImage: req.file
        ? `${process.env.SERVER_URL}/uploads/${req.file.filename}`
        : null,
    });

    await newCourse.save();

    res.status(201).send({
      success: true,
      message: "Course added successfully",
      newCourse,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Get All Courses
const getAllCoursesController = async (req, res) => {
  try {
    const courses = await courseModel.find({});

    if (courses.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Courses not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Courses retrieved successfully",
      courses,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Get Single Course by ID
const singleCourseController = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Course retrieved successfully",
      course,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Delete Course
const deleteCourseController = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }
    if (course.thumbnailImage) {
      try {
        const parts = course.thumbnailImage.split("/uploads/");
        if (parts.length === 2) {
          const filename = parts[1];
          const filePath = path.join(__dirname, "../uploads", filename);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("Image file deleted:", filename);
          }
        }
      } catch (err) {
        console.log("Failed to delete image file:", err);
      }
    }

    await courseModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// update course
const updateCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, instructor, duration, category } =
      req.body;

    const course = await courseModel.findById(id);
    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }
    if (req.file) {
      if (course.thumbnailImage) {
        try {
          const parts = course.thumbnailImage.split("/uploads/");
          if (parts.length === 2) {
            const oldFilename = parts[1];
            const oldFilePath = path.join(__dirname, "../uploads", oldFilename);
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
              console.log("Old image file deleted:", oldFilename);
            }
          }
        } catch (err) {
          console.log("Failed to delete old image file:", err);
        }
      }
      course.thumbnailImage = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;
    }
    if (title) course.title = title;
    if (description) course.description = description;
    if (price) course.price = price;
    if (instructor) course.instructor = instructor;
    if (duration) course.duration = duration;
    if (category) course.category = category;

    await course.save();

    res.status(200).send({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  addCourseController,
  getAllCoursesController,
  deleteCourseController,
  updateCourseController,
  singleCourseController,
};
