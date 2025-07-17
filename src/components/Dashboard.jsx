import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar onMenuClick={toggleSidebar} setCurrentView={setCurrentView} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        <div
          className={`
  fixed top-0 z-50 lg:relative lg:top-0 lg:translate-x-0 transition-transform duration-300 ease-in-out
   ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:block          `}
        >
          <Sidebar
            onClose={closeSidebar}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </div>

        {/* Main Content (Chat Area, etc.) */}
        <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden">
          <DashboardHome
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
