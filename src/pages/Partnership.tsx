import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { Link } from "react-router";

const initialPartners = [
  {
    id: 1,
    logo: "https://via.placeholder.com/60x60",
    link: "https://partner1.com",
  },
  {
    id: 2,
    logo: "https://via.placeholder.com/60x60",
    link: "https://partner2.io",
  },
];

const Partnership = () => {
  const [partners, setPartners] = useState(initialPartners);

  const handleEdit = (id: number) => {
    alert(`Edit partner with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      setPartners((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Partnerships</h2>
        <Link
          to="/add-partner"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <FiPlus size={20} />
          Add Partner
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">Logo</th>
              <th className="p-4">Link</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {partners.map(({ id, logo, link }) => (
              <tr key={id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={logo}
                    alt={`Partner ${id}`}
                    className="w-14 h-14 rounded-md object-contain border"
                  />
                </td>
                <td className="p-4 text-blue-600">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.length > 40 ? link.slice(0, 40) + "..." : link}
                  </a>
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
            {partners.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No partners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Partnership;
