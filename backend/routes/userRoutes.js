import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/", registerUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
