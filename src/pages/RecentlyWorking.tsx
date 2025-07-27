import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { Link } from "react-router";

const initialProjects = [
  {
    id: 1,
    photo: "https://via.placeholder.com/50",
    name: "Project Alpha",
    description: "This is a blockchain project aiming to decentralize finance.",
    launchDate: "2025-07-10",
    status: "live",
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/50",
    name: "Project Beta",
    description: "Launching a new NFT marketplace for digital artists.",
    launchDate: "2025-09-15",
    status: "upcoming",
  },
];

function formatLaunchDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

const truncateText = (text: string, maxLength = 20) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const RecentlyWorking = () => {
  const [projects, setProjects] = useState(initialProjects);

  const handleEdit = (id: number) => {
    alert(`Edit project with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((proj) => proj.id !== id));
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Recently Working
        </h2>
        <Link
          to="/add-project"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <FiPlus size={20} />
          Add Project
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">Photo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Launch</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(({ id, photo, name, description, launchDate, status }) => (
              <tr key={id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={photo}
                    alt={name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                </td>
                <td className="p-4 font-semibold">{name}</td>
                <td className="p-4 text-sm text-gray-600">
                  {truncateText(description)}
                </td>
                <td className="p-4">{formatLaunchDate(launchDate)}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      status === "live"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-md text-sm font-medium transition"
                  >
                    <FiEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentlyWorking;
