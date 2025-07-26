import React, { useState } from "react";

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

function formatLaunchDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

const truncateText = (text, maxLength = 20) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const ResponsiveProjectTable = () => {
  const [projects, setProjects] = useState(initialProjects);

  const handleEdit = (id) => {
    alert(`Edit project with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this project?")) {
      setProjects((prev) => prev.filter((proj) => proj.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Projects Table</h2>

      <div className="min-w-[700px]">
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 px-4">Photo</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Launch Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(
              ({ id, photo, name, description, launchDate, status }) => (
                <tr
                  key={id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">
                    <img
                      src={photo}
                      alt={name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold text-gray-800">
                    {name}
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {truncateText(description)}
                  </td>
                  <td className="py-2 px-4">{formatLaunchDate(launchDate)}</td>
                  <td className="py-2 px-4">
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
                  <td className="py-2 px-4 space-x-3">
                    <button
                      onClick={() => handleEdit(id)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
            {projects.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
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

export default ResponsiveProjectTable;
