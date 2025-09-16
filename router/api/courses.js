const express = require("express");
const {
  addCourseController,
  getAllCoursesController,
  deleteCourseController,
  updateCourseController,
  singleCourseController,
} = require("../../controllers/courseController");
const router = express.Router();

// Use custom multer config from helpers/uploadimage.js
const upload = require("../../helpers/uploadimage");

// localhost:3000/api/courses/add-course
router.post("/add-course", upload.single("courseImage"), addCourseController);
// localhost:3000/api/courses/get-all-courses
router.get("/get-all-courses", getAllCoursesController);
// localhost:3000/api/courses/single-course/:id
router.get("/single-course/:id", singleCourseController);
// localhost:3000/api/courses/delete-course/:id
router.delete("/delete-course/:id", deleteCourseController);
// localhost:3000/api/courses/update-course/:id
router.patch(
  "/update-course/:id",
  upload.single("courseImage"),
  updateCourseController
);

module.exports = router;
