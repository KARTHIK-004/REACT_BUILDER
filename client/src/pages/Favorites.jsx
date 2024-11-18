import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function FavoritesPage() {
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [previewComponent, setPreviewComponent] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComponents();
  }, [sortOrder, searchQuery]);

  const fetchComponents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/projects/favorites`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch components");
      }

      let data = await response.json();

      // Apply client-side filtering based on searchQuery
      if (searchQuery) {
        data = data.filter(
          (component) =>
            component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.projectName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      // Apply client-side sorting
      data.sort((a, b) => {
        switch (sortOrder) {
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          default: // newest
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });

      setComponents(data);
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

      // Update the local state
      setComponents((prevComponents) =>
        prevComponents.map((c) =>
          c.id === component.id ? { ...c, favorite: !c.favorite } : c
        )
      );

      toast({
        title: "Success",
        description: `Component ${
          component.favorite ? "removed from" : "added to"
        } favorites.`,
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

  const handlePreview = (component) => {
    setPreviewComponent(component);
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

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-[250px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-10 w-[300px]" />
      </TableCell>
    </TableRow>
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
                      <BreadcrumbLink>Favorites</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </h1>
              <div className="ml-auto">
                <Button onClick={handleAddComponent}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Favorites
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold">All Favorites</h1>
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
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Name</TableHead>
                  <TableHead className="w-[25%]">Project</TableHead>
                  <TableHead className="w-[20%]">Created At</TableHead>
                  <TableHead className="w-[25%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => <SkeletonRow key={index} />)
                ) : components.length > 0 ? (
                  components.map((component) => (
                    <TableRow key={component.id}>
                      <TableCell className="font-medium">
                        {component.name}
                      </TableCell>
                      <TableCell>{component.projectName}</TableCell>
                      <TableCell>
                        {new Date(component.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleComponentClick(component)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePreview(component)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>
                                  {component.name} Preview
                                </DialogTitle>
                                <DialogDescription>
                                  Live preview of the component
                                </DialogDescription>
                              </DialogHeader>
                              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                                <LiveProvider
                                  code={component.code}
                                  scope={{ React }}
                                >
                                  <LivePreview />
                                  <LiveError />
                                </LiveProvider>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
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
                            {component.favorite ? "Unfavorite" : "Favorite"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyCode(component)}
                          >
                            {copiedStates[component.id] ? (
                              <Check className="h-4 w-4 mr-2" />
                            ) : (
                              <Copy className="h-4 w-4 mr-2" />
                            )}
                            {copiedStates[component.id] ? "Copied" : "Copy"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <p className="text-xl text-muted-foreground mb-4">
                        No components found
                      </p>
                      <Button onClick={handleAddComponent}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Your First Component
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
