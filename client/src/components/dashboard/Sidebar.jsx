"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PenLineIcon,
  LayoutDashboard,
  FolderOpen,
  CirclePlusIcon,
  Code2,
} from "lucide-react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function Sidebar({ isSidebarCollapsed, setIsSidebarCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard";
    setActiveTab(path);
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/api/auth/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "You have been successfully logged out.",
        });
        navigate("/sign-in");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to logout");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during logout",
      });
    }
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: FolderOpen, path: "/dashboard/projects" },
    { name: "Favorites", icon: Heart, path: "/dashboard/favorites" },
    { name: "Components", icon: CirclePlusIcon, path: "/dashboard/components" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <TooltipProvider>
      <div
        className={`flex flex-col h-screen bg-background border-r fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-primary" />
              {!isSidebarCollapsed && (
                <span className="hidden font-bold sm:inline-block">
                  ReactBuilder
                </span>
              )}
            </Link>
            {/* <PenLineIcon className="h-6 w-6 text-primary" />
            {!isSidebarCollapsed && (
              <span className="ml-2 text-lg font-semibold">UI_Builder</span>
            )} */}
          </div>
        </div>
        <ScrollArea className="flex-grow border-t">
          <div className="flex flex-col items-center h-full space-y-2 p-2">
            {!isSidebarCollapsed && (
              <h1 className="text-xl font-bold my-4 w-full">WORKSPACE</h1>
            )}
            {navItems.map((item) => (
              <Tooltip key={item.name} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      activeTab === item.name.toLowerCase()
                        ? "secondary"
                        : "ghost"
                    }
                    className={`w-full justify-center md:justify-start ${
                      activeTab === item.name.toLowerCase()
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon
                      className={`h-4 w-4 ${!isSidebarCollapsed ? "mr-2" : ""}`}
                    />
                    {!isSidebarCollapsed && <span>{item.name}</span>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <div className="p-4 space-y-2">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-center md:justify-start"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    <span>Collapse</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>
                {isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              </p>
            </TooltipContent>
          </Tooltip>
          <AlertDialog>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-center md:justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
                  >
                    <LogOut
                      className={`h-4 w-4 ${!isSidebarCollapsed ? "mr-2" : ""}`}
                    />
                    {!isSidebarCollapsed && <span>Logout</span>}
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action will end your current session. You'll need to log
                  in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </TooltipProvider>
  );
}
