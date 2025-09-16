const express = require("express");
const connectDB = require("./config/db");
const router = require("./router");
const session = require("express-session");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
path = require("path");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    name: "exam",
  })
);

connectDB();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("uploads"));
app.use(router);
// localhost:3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
