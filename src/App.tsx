import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiTable,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const navItems = [
  { name: "Dashboard", icon: <FiBarChart2 /> },
  { name: "Reports", icon: <FiTable /> },
  { name: "Settings", icon: <FiSettings /> },
];
import { FiUsers, FiDollarSign, FiBriefcase, FiBarChart2 } from "react-icons/fi";
import ContactMessages from "./pages/Message";
import RecentlyWorking from "./pages/recentlyWorking";
import SimpleProjectTable from "./pages/recentlyWorking";
import ResponsiveProjectTable from "./pages/recentlyWorking";
import OurServices from "./pages/OurServices";

const cards = [
  {
    title: "Total Projects",
    value: "23",
    icon: <FiBriefcase className="text-2xl text-green-500" />,
  },
  {
    title: "Total Raised",
    value: "$56.1M",
    icon: <FiDollarSign className="text-2xl text-green-500" />,
  },
  {
    title: "Active Campaigns",
    value: "6",
    icon: <FiBarChart2 className="text-2xl text-green-500" />,
  },
  {
    title: "Clients",
    value: "18",
    icon: <FiUsers className="text-2xl text-green-500" />,
  },
];


const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const today = new Date().toLocaleDateString("en-GB"); // Format: DD/MM/YYYY

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-40 h-full w-72 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 flex flex-col justify-between`}
        >
          {/* Sidebar Top */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-green-700">Admin Panel</h1>
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded hover:bg-green-50 hover:text-green-700 text-lg font-medium transition"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>

          {/* User Info */}
          <div className="border-t border-gray-200 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
              U
            </div>
            <div className="flex-1">
              <p className="font-semibold text-green-700">Username</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
            <button className="text-red-500 hover:text-red-700 transition">
              <FiLogOut className="text-xl" />
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-auto ">
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
          <main className="flex-1 p-6  overflow-x-auto">
       <OurServices/>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 text-center p-4 text-sm text-gray-500">
            © 2025 Admin Panel | All Rights Reserved
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
