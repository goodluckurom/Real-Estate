require("dotenv").config({
  path: "config/.env",
});
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./db/db");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cookieParser());

const corsOPtion = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOPtion));

// Database connection
connectDB();

//routes
const authRouter = require("./routes/auth.routes.js");

app.use("/api/auth", authRouter);

//server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
