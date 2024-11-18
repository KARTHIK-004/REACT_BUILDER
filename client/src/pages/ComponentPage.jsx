"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  PlusCircle,
  Code,
  Calendar,
  Edit,
  Search,
  Expand,
  LayoutGrid,
  List,
  X,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function ComponentPage() {
  const [project, setProject] = useState(null);
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [fullScreenPreview, setFullScreenPreview] = useState(null);
  const { projectId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectAndComponents();
  }, [projectId]);

  const filteredComponents = useMemo(() => {
    let filtered = components.filter((component) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [components, searchQuery, sortOrder]);

  const fetchProjectAndComponents = async () => {
    try {
      setIsLoading(true);
      const projectResponse = await fetch(`/api/projects/${projectId}`, {
        credentials: "include",
      });

      if (!projectResponse.ok) {
        throw new Error("Failed to fetch project data");
      }

      const projectData = await projectResponse.json();
      setProject(projectData);
      setComponents(projectData.components || []);
    } catch (error) {
      console.error("Error fetching project data:", error);
      toast({
        title: "Error",
        description: "Failed to load project data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComponent = () => {
    navigate(`/dashboard/projects/${projectId}/new`);
  };

  const handleComponentClick = (component) => {
    navigate(`/dashboard/projects/${projectId}/component/${component._id}`, {
      state: { component },
    });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const ComponentCard = ({ component }) => (
    <Card
      className={cn(
        "flex shadow-sm hover:shadow-md transition-shadow duration-300",
        viewMode === "list" ? "flex-row items-center" : "flex-col h-full"
      )}
    >
      <CardHeader
        className={cn(
          "flex-row items-center justify-between space-y-0 pb-2",
          viewMode === "list" && "flex-1"
        )}
      >
        <CardTitle className="text-lg font-semibold truncate">
          {component.name}
        </CardTitle>
        <Badge variant="secondary" className="text-xs px-2 py-1">
          <Code className="mr-1 h-3 w-3" />
          {project?.name}
        </Badge>
      </CardHeader>
      {viewMode === "grid" && (
        <CardContent className="flex-grow p-0">
          <div className="relative bg-muted rounded-md overflow-hidden">
            <ScrollArea className="h-[200px] w-full">
              <LiveProvider code={component.code} scope={{ React }}>
                <LivePreview className="p-4" />
                <LiveError className="text-red-500 mt-2 p-2" />
              </LiveProvider>
            </ScrollArea>
          </div>
        </CardContent>
      )}
      <CardFooter
        className={cn(
          "flex items-center justify-between pt-4 text-sm text-muted-foreground",
          viewMode === "list" && "ml-auto"
        )}
      >
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          {formatDate(component.createdAt)}
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setFullScreenPreview(component)}
                >
                  <Expand className="h-4 w-4" />
                  <span className="sr-only">Full Screen Preview</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Full Screen Preview</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleComponentClick(component)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Component</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Component</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <Breadcrumb className="mb-4 md:mb-0">
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
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    {project?.name || "Loading..."}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Button onClick={handleAddComponent}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Component
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold">
              {project?.name || "Project Components"}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components"
                  className="pl-8 w-full md:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-20" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-48 w-full mb-4" />
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-4">
                    <Skeleton className="h-4 w-1/4" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredComponents.length > 0 ? (
            <div
              className={cn(
                viewMode === "grid" &&
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                viewMode === "list" && "space-y-4"
              )}
            >
              {filteredComponents.map((component) => (
                <ComponentCard key={component._id} component={component} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-xl text-muted-foreground mb-4">
                No components found
              </p>
              <Button
                onClick={() => navigate(`/dashboard/projects/${projectId}/new`)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Component
              </Button>
            </div>
          )}
        </div>
      </main>

      <Dialog
        open={!!fullScreenPreview}
        onOpenChange={() => setFullScreenPreview(null)}
      >
        <DialogContent className="max-w-full h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{fullScreenPreview?.name}</DialogTitle>
            <DialogDescription>
              Full screen preview of the component
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-background">
            {fullScreenPreview && (
              <LiveProvider code={fullScreenPreview.code} scope={{ React }}>
                <LivePreview />
                <LiveError />
              </LiveProvider>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => setFullScreenPreview(null)}
          ></Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
