const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// signup controller
const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.status(400).json({
          Success: false,
          message: err.message || "Something went wrong",
        });
      } else {
        const user = userModel({ username, email, password: hash });
        await user.save();
        res.status(201).json({
          Success: true,
          message: "User created successfully",
          data: user,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      Success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const userData = {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
      username: existingUser.username,
    };

    if (existingUser.role == "admin") {
      req.session.cookie.maxAge = 5 * 60 * 1000;
    } else {
      req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    }

    req.session.user = userData;
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const logoutController = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed",
        });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
module.exports = { signupController, loginController, logoutController };
