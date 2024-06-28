import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

const port = process.env.PORT;
dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL)
  .then(() => {
    console.log("connected to MongoDB!");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
