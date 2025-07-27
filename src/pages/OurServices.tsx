import { useState } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { Link } from "react-router";

const initialServices = [
  {
    id: 1,
    name: "Influencer Marketing",
    link: "https://example.com/influencer-marketing",
  },
  {
    id: 2,
    name: "Crypto Fundraising",
    link: "https://example.com/crypto-fundraising",
  },
  {
    id: 3,
    name: "Blockchain Consulting",
    link: "",
  },
];

const OurServices = () => {
  const [services, setServices] = useState(initialServices);

  const handleEdit = (id: number) => {
    alert(`Edit service with ID: ${id}`);
    // Edit লজিক এখানে যোগ করতে পারো
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((service) => service.id !== id));
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Our Services</h2>
        <Link
          to="/add-service"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <FiPlus size={20} />
          Add Service
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Link</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr
                key={service.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{index + 1}</td>
                <td className="p-4 font-semibold">{service.name}</td>
                <td className="p-4 text-blue-600">
                  {service.link ? (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {service.link.length > 30
                        ? service.link.slice(0, 30) + "..."
                        : service.link}
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No Link</span>
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(service.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-md text-sm font-medium transition"
                  >
                    <FiEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OurServices;
