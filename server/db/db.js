// require("dotenv").config();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = (uri) => {
  // const uri = process.env.MONGODB_CONNECTION_UR;
  if (uri) {
    throw new Error("MONGODB_URI variable is not set");
  }

  mongoose
    .connect(
      // uri,
      "mongodb+srv://urosoftme:TurboAt2019@cluster0.l562uhl.mongodb.net/",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
