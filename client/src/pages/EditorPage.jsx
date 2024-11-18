"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Check,
  Copy,
  GripVertical,
  Heart,
  Loader2,
  Menu,
  PencilRuler,
  Redo,
  RefreshCw,
  Save,
  Trash2,
  Undo,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme/theme-provider";
import Sidebar from "@/components/dashboard/Sidebar";

export default function EditorPage() {
  const { projectId, componentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { component } = location.state || {};

  const [code, setCode] = useState(
    component?.code ||
      `<div className="p-4 rounded-lg bg-blue-500 text-white">
  <h1 className="text-3xl font-bold">Hello World</h1>
  <p className="mt-2">This is a sample component</p>
</div>`
  );
  const [componentName, setComponentName] = useState(component?.name || "");
  const [projectName, setProjectName] = useState("");
  const [isFavorite, setIsFavorite] = useState(component?.favorite || false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [editorHistory, setEditorHistory] = useState([code]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    fetchProjectName();
    if (componentId) {
      fetchComponent();
    }
  }, [projectId, componentId]);

  const fetchProjectName = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const data = await response.json();
      setProjectName(data.name);
    } catch (error) {
      console.error("Error fetching project:", error);
      toast({
        title: "Error",
        description: "Failed to load project details. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchComponent = async () => {
    if (!componentId) return;

    try {
      const response = await fetch(
        `/api/projects/${projectId}/components/${componentId}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch component");
      }
      const data = await response.json();
      setCode(data.code);
      setComponentName(data.name);
      setIsFavorite(data.favorite);
      setEditorHistory([data.code]);
      setHistoryIndex(0);
    } catch (error) {
      console.error("Error fetching component:", error);
      toast({
        title: "Error",
        description: "Failed to load component. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (value) => {
    setCode(value);
    setEditorHistory((prev) => [...prev.slice(0, historyIndex + 1), value]);
    setHistoryIndex((prev) => prev + 1);
  };

  const handleSave = useCallback(async () => {
    if (!componentName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a component name before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    const savedComponent = {
      name: componentName,
      code: code,
      favorite: isFavorite,
    };

    try {
      console.log("Saving component with details:", {
        url: componentId
          ? `/api/projects/${projectId}/components/${componentId}`
          : `/api/projects/${projectId}/components`,
        method: componentId ? "PUT" : "POST",
        projectId,
        componentId,
        savedComponent,
      });

      const url = componentId
        ? `/api/projects/${projectId}/components/${componentId}`
        : `/api/projects/${projectId}/components`;

      const method = componentId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedComponent),
        credentials: "include",
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error response:", errorData);
        throw new Error(errorData?.message || "Failed to save component");
      }

      const data = await response.json();
      console.log("Success response:", data);

      setComponentName(data.name);
      setCode(data.code);
      setIsFavorite(data.favorite);
      setEditorHistory([...editorHistory, data.code]);
      setHistoryIndex(editorHistory.length);

      setIsSaving(false);
      toast({
        title: "Component saved",
        description: `Your component "${data.name}" has been successfully saved.`,
      });

      // Update the URL if it's a new component
      if (!componentId && data._id) {
        navigate(`/dashboard/projects/${projectId}/component/${data._id}`, {
          replace: true,
          state: { component: data },
        });
      }
    } catch (error) {
      console.error("Error saving component:", error);
      setIsSaving(false);
      toast({
        title: "Error",
        description: `Failed to save component: ${error.message}. Please check the console for more details.`,
        variant: "destructive",
      });
    }
  }, [
    componentName,
    code,
    isFavorite,
    projectId,
    componentId,
    navigate,
    toast,
    editorHistory,
  ]);

  const handleCancel = () => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess(true);
      toast({
        title: "Copied to clipboard",
        description: "The code has been copied to your clipboard.",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleFavoriteToggle = async () => {
    if (!componentId) {
      toast({
        title: "Error",
        description: "Please save the component before marking it as favorite.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newFavoriteStatus = !isFavorite;
      const response = await fetch(
        `/api/projects/${projectId}/components/${componentId}/favorite`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorite: newFavoriteStatus }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      setIsFavorite(newFavoriteStatus);
      toast({
        title: newFavoriteStatus
          ? "Added to favorites"
          : "Removed from favorites",
        description: `This component has been ${
          newFavoriteStatus ? "added to" : "removed from"
        } your favorites.`,
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast({
        title: "Error",
        description: "Failed to update favorite status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setCode(editorHistory[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < editorHistory.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setCode(editorHistory[historyIndex + 1]);
    }
  };

  const handleReset = () => {
    setCode(
      `<div className="p-4 rounded-lg bg-blue-500 text-white">
  <h1 className="text-3xl font-bold">Hello World</h1>
  <p className="mt-2">This is a sample component</p>
</div>`
    );
    setEditorHistory([code]);
    setHistoryIndex(0);
  };

  const handleDelete = async () => {
    if (!componentId) {
      toast({
        title: "Error",
        description: "Cannot delete an unsaved component.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/projects/${projectId}/components/${componentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server error response:", errorData);

        let errorMessage = "An unexpected error occurred. Please try again.";
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else if (response.status === 500) {
          errorMessage =
            "Internal server error. Please try again later or contact support.";
        }

        throw new Error(errorMessage);
      }

      toast({
        title: "Component deleted",
        description: "The component has been successfully deleted.",
      });

      navigate(`/dashboard/projects/${projectId}`);
    } catch (error) {
      console.error("Error deleting component:", error);
      toast({
        title: "Error",
        description: `Failed to delete component: ${error.message}. Please try again or contact support if the issue persists.`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSave]);

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
          <div className="flex-1 px-4 flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/dashboard/projects">
                    Projects
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    as={Link}
                    to={`/dashboard/projects/${projectId}`}
                  >
                    {projectName || "Loading..."}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    {componentName || "New Component"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden p-4">
        <Card className="w-full h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <PencilRuler className="h-6 w-6" />
              {componentId ? "Edit Component" : "Create New Component"}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavoriteToggle}
                disabled={!componentId}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite ? "fill-current text-red-500" : ""
                  }`}
                />
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copySuccess ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {copySuccess ? "Copied" : "Copy"}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={!componentId || isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-1" />
                    )}
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the component and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex items-center space-x-2">
                <Label htmlFor="componentName" className="text-sm font-medium">
                  Component Name
                </Label>
                <Input
                  id="componentName"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  placeholder="Enter Component Name..."
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUndo}
                      disabled={historyIndex === 0}
                    >
                      <Undo className="h-4 w-4 mr-1" />
                      Undo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRedo}
                      disabled={historyIndex === editorHistory.length - 1}
                    >
                      <Redo className="h-4 w-4 mr-1" />
                      Redo
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                  <Select
                    value={editorLanguage}
                    onValueChange={setEditorLanguage}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <PanelGroup direction="horizontal" className="h-full">
                  <Panel defaultSize={50} minSize={30}>
                    <div className="h-full flex flex-col">
                      <div className="flex-1 border rounded-md overflow-hidden">
                        <Editor
                          theme={theme === "dark" ? "vs-dark" : "light"}
                          height="100%"
                          language={editorLanguage}
                          value={code}
                          onChange={handleChange}
                          options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            wordWrap: "on",
                          }}
                        />
                      </div>
                    </div>
                  </Panel>
                  <PanelResizeHandle className="w-2 bg-muted">
                    <div className="h-full flex items-center justify-center">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </PanelResizeHandle>
                  <Panel defaultSize={50} minSize={30}>
                    <div className="h-full border rounded-md p-4 bg-background overflow-auto">
                      <LiveProvider code={code} noInline={false}>
                        <LiveError className="text-red-500 text-sm mb-2" />
                        <LivePreview />
                      </LiveProvider>
                    </div>
                  </Panel>
                </PanelGroup>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
