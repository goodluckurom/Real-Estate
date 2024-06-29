require("dotenv").config({
  path: "config/.env",
});
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./db/db");
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();

//routes

//server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
