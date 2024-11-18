import Project from "../models/project.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
  } catch (error) {
    next(errorHandler(500, "Error fetching projects"));
  }
};

export const createProject = async (req, res, next) => {
  const { name, description, components } = req.body;
  const project = new Project({
    name,
    description,
    components,
    userId: req.user.id,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    next(errorHandler(400, "Error creating project"));
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    next(errorHandler(500, "Error fetching project"));
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    res.json(project);
  } catch (error) {
    next(errorHandler(400, "Error updating project"));
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    res.json({
      message: "Project deleted successfully",
      deletedProject: project,
    });
  } catch (error) {
    next(errorHandler(500, "Error deleting project"));
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
          id: component._id,
          projectId: project._id,
          projectName: project.name,
        }))
    );
    res.json(favoriteComponents);
  } catch (error) {
    console.error("Error fetching favorite components:", error);
    next(errorHandler(500, "Error fetching favorite components"));
  }
};

export const getAllComponents = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.user.id });

    // Extract and flatten all components from all projects
    const allComponents = projects.flatMap((project) =>
      project.components.map((component) => ({
        id: component._id,
        name: component.name,
        code: component.code,
        favorite: component.favorite,
        createdAt: component.createdAt,
        projectId: project._id,
        projectName: project.name,
      }))
    );

    res.json({ components: allComponents });
  } catch (error) {
    console.error("Error fetching all components:", error);
    next(errorHandler(500, "Error fetching components"));
  }
};
