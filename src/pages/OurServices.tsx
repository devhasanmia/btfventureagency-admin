import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
import { useDeleteServiceByIdMutation, useGetServicesQuery } from "../redux/api/ourservice/ourservice";
import { toast } from "sonner";


const OurServices = () => {
  interface Iservice {
    _id: string
    name: string
    link?: string
    createdAt: string
    updatedAt: string
    __v: number
  }

  const { data: services } = useGetServicesQuery("")
  const [deleteService] = useDeleteServiceByIdMutation()
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteService(id).unwrap();
      toast.success(result?.message)
    } catch (error: any) {
      toast.warning(error?.data?.message);
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
            {services?.data?.map((service: Iservice, index: string) => (
              <tr
                key={service._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{index + 1}</td>
                <td className="p-4 font-semibold">{service.name}</td>
                <td className="p-4 text-blue-600">
                  {service?.link ? (
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
                  {/* <button
                    onClick={() => handleEdit(service.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-md text-sm font-medium transition"
                  >
                    <FiEdit />
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(service._id)}
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
    </div >
  );
};

export default OurServices;
