import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth(Login) User/Set Token
//@route POST/api/users/auth
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register New User User/Set Token
//@route POST/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  //Destructuring Data From req.body
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logut User
//@route POST/api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get User Profile
//@route GET/api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile" });
});

// @desc Update User Profile
//@route PUT/api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});

export {
  authUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
};
