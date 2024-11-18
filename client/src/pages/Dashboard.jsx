import Sidebar from "@/components/dashboard/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for larger screens */}
      <aside
        className={`hidden md:block ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } border-r bg-muted/40 transition-all duration-300`}
      >
        {/* Sidebar */}
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
      </aside>
      <Outlet />
    </div>
  );
}
