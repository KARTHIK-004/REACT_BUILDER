"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Edit,
  Eye,
  Star,
  StarOff,
  Menu,
  PlusCircle,
  Copy,
  Check,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function ComponentsPage() {
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [copiedStates, setCopiedStates] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/projects/components`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch components");
      }

      const data = await response.json();
      setComponents(data.components);
    } catch (error) {
      console.error("Error fetching components:", error);
      toast({
        title: "Error",
        description: "Failed to load components. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleComponentClick = (component) => {
    navigate(
      `/dashboard/projects/${component.projectId}/component/${component.id}`
    );
  };

  const handleToggleFavorite = async (component) => {
    try {
      const response = await fetch(
        `/api/projects/${component.projectId}/components/${component.id}/favorite`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle favorite status");
      }

      setComponents((prevComponents) =>
        prevComponents.map((c) =>
          c.id === component.id ? { ...c, favorite: !c.favorite } : c
        )
      );

      toast({
        title: "Success",
        description: `Component ${component.favorite ? "removed from" : "added to"} favorites.`,
      });
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      toast({
        title: "Error",
        description: "Failed to update favorite status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddComponent = () => {
    navigate("/dashboard/projects");
  };

  const handleCopyCode = (component) => {
    navigator.clipboard.writeText(component.code);
    setCopiedStates({ ...copiedStates, [component.id]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [component.id]: false });
    }, 2000);
    toast({
      title: "Copied!",
      description: "Component code copied to clipboard.",
    });
  };

  const filteredAndSortedComponents = components
    .filter(
      (component) =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const SkeletonCard = () => (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-4 w-[200px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[100px] w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-[100px]" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background">
      <header className="border-b">
        <div className="px-4 h-16 items-center flex">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
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
                <Breadcrumb className="mb-4 md:mb-0">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink onClick={() => navigate("/dashboard")}>
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink>All Components</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </h1>
              <div className="ml-auto">
                <Button onClick={handleAddComponent}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Component
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold">All Components</h1>
            <div className="flex items-center space-x-4">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full md:w-[250px]"
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
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            ) : filteredAndSortedComponents.length > 0 ? (
              filteredAndSortedComponents.map((component) => (
                <Card key={component.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{component.name}</span>
                      {component.favorite && (
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          Favorite
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">
                      Project: {component.projectName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Created:{" "}
                      {new Date(component.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{component.name} Preview</DialogTitle>
                          <DialogDescription>
                            Live preview of the component
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                          <LiveProvider code={component.code} scope={{ React }}>
                            <LivePreview />
                            <LiveError />
                          </LiveProvider>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleComponentClick(component)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFavorite(component)}
                      >
                        {component.favorite ? (
                          <StarOff className="h-4 w-4 mr-2" />
                        ) : (
                          <Star className="h-4 w-4 mr-2" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(component)}
                      >
                        {copiedStates[component.id] ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-xl text-muted-foreground mb-4">
                  No components found
                </p>
                <Button onClick={handleAddComponent}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Component
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
