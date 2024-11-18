// component.controller.js
import Project from "../models/project.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllComponents = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.user.id,
    });
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    res.json(project.components);
  } catch (error) {
    console.error("Error fetching components:", error);
    next(errorHandler(500, "Error fetching components"));
  }
};

export const createComponent = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.user.id,
    });
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    const { name, code, favorite } = req.body;
    const newComponent = {
      name,
      code,
      favorite: favorite || false,
    };
    project.components.push(newComponent);
    await project.save();
    res.status(201).json(newComponent);
  } catch (error) {
    console.error("Error creating component:", error);
    next(errorHandler(400, "Error creating component"));
  }
};

export const getComponent = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.user.id,
    });
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    const component = project.components.id(req.params.componentId);
    if (!component) {
      return next(errorHandler(404, "Component not found"));
    }
    res.json(component);
  } catch (error) {
    console.error("Error fetching component:", error);
    next(errorHandler(500, "Error fetching component"));
  }
};

export const updateComponent = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.user.id,
    });
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    const component = project.components.id(req.params.componentId);
    if (!component) {
      return next(errorHandler(404, "Component not found"));
    }
    Object.assign(component, req.body);
    await project.save();
    res.json(component);
  } catch (error) {
    console.error("Error updating component:", error);
    next(errorHandler(400, "Error updating component"));
  }
};

export const deleteComponent = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.user.id,
    });
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    const component = project.components.id(req.params.componentId);
    if (!component) {
      return next(errorHandler(404, "Component not found"));
    }
    component.remove();
    await project.save();
    res.json({ message: "Component deleted successfully" });
  } catch (error) {
    console.error("Error deleting component:", error);
    next(errorHandler(500, "Error deleting component"));
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      userId: req.user.id,
    });
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    const component = project.components.id(req.params.componentId);
    if (!component) {
      return next(errorHandler(404, "Component not found"));
    }
    component.favorite = !component.favorite;
    await project.save();
    res.json(component);
  } catch (error) {
    console.error("Error toggling favorite status:", error);
    next(errorHandler(400, "Error toggling favorite status"));
  }
};

export const getFavoriteComponents = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    const favoriteComponents = projects.flatMap((project) =>
      project.components
        .filter((component) => component.favorite)
        .map((component) => ({
          ...component.toObject(),
          projectId: project._id,
          projectName: project.name,
        }))
    );
    res.json(favoriteComponents);
  } catch (error) {
    next(errorHandler(500, "Error fetching favorite components"));
  }
};
