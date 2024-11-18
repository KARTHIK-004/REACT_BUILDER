import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  changePassword,
  updateProfile,
  getProfile,
  updateVisibility,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);
router.put("/password", verifyToken, changePassword);
router.put("/visibility", verifyToken, updateVisibility);

export default router;
