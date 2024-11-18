import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getAllComponents,
  createComponent,
  getComponent,
  updateComponent,
  deleteComponent,
  toggleFavorite,
} from "../controllers/component.controller.js";

const router = express.Router({ mergeParams: true });

router.use(verifyToken);

router.get("/", getAllComponents);
router.post("/", createComponent);
router.get("/:componentId", getComponent);
router.put("/:componentId", updateComponent);
router.delete("/:componentId", deleteComponent);
router.put("/:componentId/favorite", toggleFavorite);

export default router;
