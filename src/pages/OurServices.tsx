import { useState } from "react";

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

  const handleEdit = (id) => {
    alert(`Edit service with ID: ${id}`);
    // Edit লজিক এখানে যোগ করতে পারো
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((service) => service.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Our Services</h2>

      <div className="min-w-[400px]">
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Link</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(({ id, name, link }) => (
              <tr key={id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4 font-semibold text-gray-800">{name}</td>
                <td className="py-2 px-4">
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline"
                    >
                      Visit
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No Link</span>
                  )}
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
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No services available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OurServices;
