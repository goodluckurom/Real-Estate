const User = require("../model/User");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      message: "User created successfully!",
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
        message: "User not found",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, "process.env.JWT_SECRET", {
      expiresIn: "1h",
    });

    const { password: pass, ...rest } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

exports.GoogleSignIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "process.env.JWT_SECRET", {
        expiresIn: "1h",
      });
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const name =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const { email, photoUrl } = req.body;
      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
        avatar: photoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "process.env.JWT_SECRET", {
        expiresIn: "1h",
      });
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          ...rest,
        });
    }
  } catch (error) {
    next(error);
  }
};

exports.signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
