const { default: mongoose } = require("mongoose");

const successSChema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  storyVideo: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Success", successSChema);
