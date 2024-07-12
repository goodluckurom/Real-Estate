const User = require("../model/User");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error");

exports.updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new errorHandler(403, "Unauthorized to update!"));
  }

  try {
    const { email, username, avatar, password: plainPassword } = req.body;

    // Check if the email already exists for another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      return next(new errorHandler(409, "Email already in use!"));
    }

    // Hash the password if it exists
    let password;
    if (plainPassword) {
      password = await bcrypt.hash(plainPassword, 10);
    }

    const updateData = { username, email, avatar };
    if (password) {
      updateData.password = password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return next(new errorHandler(404, "User not found!"));
    }

    const { password: hashedPassword, ...rest } = updatedUser._doc;

    res.status(200).json({
      ...rest,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log("delete route reached...");
  if (req.user.id !== req.params.id) {
    return next(new errorHandler(401, "Unauthorised to delete..."));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({
      message: "User deleted successfully!...",
    });
  } catch (error) {
    next(error);
  }
};
