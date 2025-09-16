const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be more than 6 characters"],
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
