import React from "react";
import {  FiTrash2, FiPlus, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  useDeleteRecentlyWorkingMutation,
  useGetRecentlyWorkingQuery,
  useUpdateRecentlyWorkingMutation,
} from "../redux/api/recently-working/recently-working";
import { formatPrettyDate } from "../utils/formatPrettyDate";

// Type definition
interface IProject {
  _id: string;
  picture: string;
  name: string;
  description: string;
  launch: string;
  status: "Live" | "Upcoming";
}

// Utility
const truncateText = (text: string, maxLength = 40) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const RecentlyWorking: React.FC = () => {
  const { data: projects, isLoading } = useGetRecentlyWorkingQuery("");
  const [deleteRecentlyWorking] = useDeleteRecentlyWorkingMutation();
  const [updateStatus] = useUpdateRecentlyWorkingMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteRecentlyWorking(id).unwrap();
      toast.success(res.message || "Deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete");
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: "Live" | "Upcoming") => {
    const newStatus = currentStatus === "Live" ? "Upcoming" : "Live";
    try {
      const res = await updateStatus({ id, status: newStatus }).unwrap();
      toast.success(res.message || "Status updated");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Recently Working</h2>
        <Link
          to="/add-project"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition"
        >
          <FiPlus size={18} />
          Add Project
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="p-4">Photo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Launch</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && projects?.data?.length > 0 ? (
              projects.data.map((project: IProject) => (
                <tr key={project._id} className="border-t hover:bg-gray-50 text-sm">
                  <td className="p-4">
                    <img
                      src={project.picture}
                      alt={project.name}
                      className="w-12 h-12 rounded-md object-cover border"
                    />
                  </td>
                  <td className="p-4 font-semibold">{project.name}</td>
                  <td className="p-4 text-gray-600">{truncateText(project.description)}</td>
                  <td className="p-4">{formatPrettyDate(project.launch)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusToggle(project._id, project.status)}
                      className={`group inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border 
      ${project.status === "Live"
                          ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                          : "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
                        }
    `}
                    >
                      <span className="group-hover:rotate-180 transition-transform duration-300">
                        <FiRefreshCw size={14} />
                      </span>
                      {project.status}
                    </button>
                  </td>

                  <td className="p-4 flex gap-2 justify-center">
                    {/* <button
                      onClick={() => alert(`Edit ${project._id}`)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-md text-xs font-medium transition"
                    >
                      <FiEdit size={14} />
                      Edit
                    </button> */}
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-xs font-medium transition"
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 text-sm">
                  {isLoading ? "Loading projects..." : "No projects found."}
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
