import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc Get all users
// @route GET /api/admin/get-users
// @access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc get user by id
// @route GET /api/admin/get-user/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user role
// @route PUT /api/admin/update-user/:id
// @access Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.role = req.body.role || user.role;
    user.name = req.body.name || user.name;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc delete user
// @route DELETE /api/admin/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne({ _id: req.params.id });
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {getAllUsers, getUserById, updateUserByAdmin, deleteUser}