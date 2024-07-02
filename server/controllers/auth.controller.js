const bcrypt = require("bcrypt");
const User = require("../model/User");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Password must match",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists...login",
      });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: "user created successfully!...",
    });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("signin route reached");
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "user not found...",
      });
    }
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "invalid password...",
      });
    }

    const token = jwt.sign({ id: user._id }, "thuhesiuhhihdfuhipuhduhu");

    const { password: pass, ...rest } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

exports.signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!..");
  } catch (error) {
    next(error);
  }
};
