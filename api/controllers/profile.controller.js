import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(errorHandler(404, "User  not found"));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can update only your own profile"));
  }
  try {
    const { username, email, avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { username, email, avatar } },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return next(errorHandler(404, "User  not found"));
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "User not found"));

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword)
      return next(errorHandler(401, "Current password is incorrect"));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateVisibility = async (req, res, next) => {
  try {
    const { visibility } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { visibility },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
