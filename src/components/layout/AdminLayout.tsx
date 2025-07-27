import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const today = new Date().toLocaleDateString("en-GB");
  return (
    <div className="font-sans text-gray-800 bg-gray-50 ">
      <div className="flex h-screen">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2 rounded hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu className="text-2xl text-green-700" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                Welcome back!
              </h2>
            </div>
            <span className="text-sm text-gray-500 font-medium">{today}</span>
          </header>

          {/* Main Section */}
          <main className="flex-1 p-6 overflow-x-auto">
            <Outlet />
          </main>

          
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
