import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardHome from "./DashboardHome";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract the view from the URL (e.g., /dashboard/post -> 'post')
  const currentView = location.pathname.split('/').pop() || 'home';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleNavigation = (view: string) => {
    navigate(`/dashboard/${view}`);
    closeSidebar();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Navbar onMenuClick={toggleSidebar} />

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
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:block
          `}
        >
          <Sidebar
            onClose={closeSidebar}
            currentView={currentView}
            setCurrentView={handleNavigation}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 h-full flex flex-col overflow-hidden bg-white dark:bg-gray-800">
          <DashboardHome currentView={currentView} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;