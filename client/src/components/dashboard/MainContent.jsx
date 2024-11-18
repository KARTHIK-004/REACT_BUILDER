"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Box,
  Plus,
  Heart,
  FolderOpen,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import Navbar from "./Navbar";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@radix-ui/react-scroll-area"

export default function MainContent() {
  const [projects, setProjects] = useState([]);
  const [favoriteComponents, setFavoriteComponents] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
    fetchFavoriteComponents();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/projects`, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFavoriteComponents = async () => {
    try {
      const response = await fetch(`/api/projects/favorites`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch favorite components: ${response.statusText}`
        );
      }
      const data = await response.json();
      setFavoriteComponents(data);
    } catch (error) {
      console.error("Error fetching favorite components:", error);
      toast({
        title: "Error",
        description: "Failed to load favorite components. Please try again.",
        variant: "destructive",
      });
      setFavoriteComponents([]);
    }
  };

  const handleCreateProject = async () => {
    if (newProjectName.trim()) {
      try {
        const response = await fetch(`/api/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newProjectName }),
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create project");
        }
        const newProject = await response.json();
        setProjects([newProject, ...projects]);
        setNewProjectName("");
        toast({
          title: "Success",
          description: "Project created successfully.",
        });
      } catch (error) {
        console.error("Error creating project:", error);
        toast({
          title: "Error",
          description: "Failed to create project. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
  };

  const handleUpdateProject = async () => {
    if (editingProject) {
      try {
        const response = await fetch(`/api/projects/${editingProject._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProject),
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update project");
        }
        const updatedProject = await response.json();
        setProjects(
          projects.map((p) =>
            p._id === updatedProject._id ? updatedProject : p
          )
        );
        setEditingProject(null);
        toast({
          title: "Success",
          description: "Project updated successfully.",
        });
      } catch (error) {
        console.error("Error updating project:", error);
        toast({
          title: "Error",
          description: "Failed to update project. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete project");
      }
      setProjects(projects.filter((p) => p._id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFavoriteComponent = async (componentId, projectId) => {
    try {
      const response = await fetch(
        `/api/projects/${projectId}/components/${componentId}/favorite`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to remove favorite component"
        );
      }
      setFavoriteComponents(
        favoriteComponents.filter((c) => c._id !== componentId)
      );
      toast({
        title: "Success",
        description: "Component removed from favorites.",
      });
    } catch (error) {
      console.error("Error removing favorite component:", error);
      toast({
        title: "Error",
        description: "Failed to remove favorite component. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const ProjectCard = ({ project }) => (
    <div
      className="bg-muted/40 p-4 rounded-lg cursor-pointer hover:bg-muted/60 transition-colors"
      onClick={() => handleProjectClick(project._id)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">{project.name}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.stopPropagation();
                handleEditProject(project);
              }}
            >
              Edit project
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.stopPropagation();
                handleDeleteProject(project._id);
              }}
            >
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-between items-center">
        <Badge variant="secondary">
          {project.components.length} components
        </Badge>
        <span className="text-sm text-muted-foreground">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-muted/40 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );

  const FavoriteComponentCard = ({ component }) => (
    <div
      className="bg-muted/40 p-4 rounded-lg cursor-pointer hover:bg-muted/60 transition-colors"
      onClick={() =>
        navigate(
          `/dashboard/projects/${component.projectId}/component/${component._id}`
        )
      }
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">{component.name}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteFavoriteComponent(component._id, component.projectId);
          }}
        >
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          <span className="sr-only">Remove from favorites</span>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        From: {component.projectName}
      </p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 overflow-y-auto p-4">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-bold mb-4">Error</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button
                onClick={() => {
                  setError(null);
                  fetchProjects();
                  fetchFavoriteComponents();
                }}
              >
                Retry
              </Button>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-1/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-9 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-9 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : projects.length === 0 && favoriteComponents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-2xl font-bold mb-4">
                Welcome to React Builder
              </h2>
              <p className="text-muted-foreground mb-8">
                Get started by creating a project or adding favorite components
              </p>
              <div className="flex space-x-4">
                <Button onClick={() => navigate("/dashboard/projects")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard/components")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Add Favorites
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Projects Created
                    </CardTitle>
                    <Box className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projects.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Components Added
                    </CardTitle>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {projects.reduce(
                        (sum, project) => sum + project.components.length,
                        0
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Favorite Components
                    </CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {favoriteComponents.length}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Recent Projects</CardTitle>
                  <div className="flex space-x-2 pb-2">
                    {projects.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/dashboard/projects")}
                      >
                        View More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.slice(0, 6).map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Favorite Components</CardTitle>
                  <div className="flex space-x-2 pb-2">
                    {favoriteComponents.length > 3 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/dashboard/favorites")}
                      >
                        View More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {favoriteComponents.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {favoriteComponents.slice(0, 3).map((component) => (
                        <FavoriteComponentCard
                          key={component._id}
                          component={component}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">
                        No favorite components yet
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add components to your favorites to see them here
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/dashboard/components")}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Favorite Components
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </ScrollArea>
      </div>
      <Dialog
        open={!!editingProject}
        onOpenChange={() => setEditingProject(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Project Name"
            value={editingProject?.name || ""}
            onChange={(e) =>
              setEditingProject(
                editingProject
                  ? { ...editingProject, name: e.target.value }
                  : null
              )
            }
          />
          <DialogFooter>
            <Button onClick={handleUpdateProject}>Update Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
