import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getAllComponents,
  getFavoriteComponents,
} from "../controllers/project.controller.js";
import componentRoutes from "./component.route.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getAllProjects);
router.post("/", createProject);
router.get("/favorites", getFavoriteComponents);
router.get("/components", getAllComponents);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.use("/:projectId/components", componentRoutes);

export default router;
