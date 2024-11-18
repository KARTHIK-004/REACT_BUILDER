"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  PlusCircle,
  Search,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Folder,
  Calendar,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(`/api/projects`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [projects, searchQuery]);

  const handleCopyProject = async (project, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: `${project.name} (Copy)`,
          description: project.description,
          components: project.components,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to copy project");
      }
      const newProject = await response.json();
      setProjects((prevProjects) => [...prevProjects, newProject]);
      toast({
        title: "Project copied",
        description: `${newProject.name} has been created.`,
      });
    } catch (error) {
      console.error("Error copying project:", error);
      toast({
        title: "Error",
        description: "Failed to copy project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      const { deletedProject } = await response.json();
      setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id));
      setDeletingProject(null);
      toast({
        title: "Project deleted",
        description: `${deletedProject.name} has been deleted.`,
        variant: "destructive",
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

  const handleEditProject = async (updatedProject) => {
    try {
      const response = await fetch(`/api/projects/${updatedProject._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedProject),
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      const editedProject = await response.json();
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p._id === editedProject._id ? editedProject : p
        )
      );
      setFilteredProjects((prevFiltered) =>
        prevFiltered.map((p) =>
          p._id === editedProject._id ? editedProject : p
        )
      );
      setEditingProject(null);
      toast({
        title: "Project updated",
        description: `${editedProject.name} has been updated.`,
      });
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddProject = async (newProject) => {
    try {
      const response = await fetch(`/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newProject),
      });
      if (!response.ok) {
        throw new Error("Failed to create project");
      }
      const createdProject = await response.json();
      setProjects((prevProjects) => [...prevProjects, createdProject]);
      setIsAddingProject(false);
      toast({
        title: "Project added",
        description: `${createdProject.name} has been created.`,
      });
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const ProjectForm = ({ project, onSubmit, onCancel }) => {
    const [name, setName] = useState(project?.name || "");
    const [description, setDescription] = useState(project?.description || "");

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ ...project, name, description });
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="flex-1 px-4 flex items-center">
            <h1 className="text-lg font-semibold">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      onClick={() => navigate("/dashboard/projects")}
                    >
                      Projects
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </h1>
            <div className="relative ml-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8 w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <ProjectForm
                project={{ name: "", description: "" }}
                onSubmit={handleAddProject}
                onCancel={() => setIsAddingProject(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <Card
                key={project._id}
                className="flex flex-col cursor-pointer hover:border-primary transition-colors"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle
                    onClick={() => handleProjectClick(project._id)}
                    className="cursor-pointer hover:underline"
                  >
                    {project.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.stopPropagation();
                          setEditingProject(project);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => handleCopyProject(project, e)}
                      >
                        <Copy className="mr-2 h-4 w-4" /> Copy
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.stopPropagation();
                          setDeletingProject(project);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Folder className="mr-2 h-4 w-4" />
                      <span>{project.components?.length || 0} components</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>

      {editingProject && (
        <Dialog
          open={!!editingProject}
          onOpenChange={() => setEditingProject(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              onSubmit={handleEditProject}
              onCancel={() => setEditingProject(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {deletingProject && (
        <Dialog
          open={!!deletingProject}
          onOpenChange={() => setDeletingProject(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {deletingProject.name}? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeletingProject(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={(e) => handleDeleteProject(deletingProject._id, e)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
