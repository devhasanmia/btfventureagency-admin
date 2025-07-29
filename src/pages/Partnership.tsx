import { FiTrash2, FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { useDeletePartnershipMutation, useGetAllPartnershipQuery } from "../redux/api/partnership/partnership";
import { toast } from "sonner";

const Partnership = () => {
  const { data: partners, isLoading, isError } = useGetAllPartnershipQuery("");

  const [deletePartnership] = useDeletePartnershipMutation()

  const handleDelete = async (id: string) => {
    try {
      const result = await deletePartnership(id).unwrap();
      toast.success(result?.message)
    } catch (error: any) {
      toast.warning(error?.data?.message);
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
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-red-500">
                  Failed to load data.
                </td>
              </tr>
            )}

            {!isLoading && partners?.data?.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No partners found.
                </td>
              </tr>
            )}

            {partners?.data?.map((partner: any) => (
              <tr key={partner._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name || "Partner Logo"}
                    className="w-14 h-14 rounded-md object-contain border"
                  />
                </td>
                <td className="p-4 text-blue-600">
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {partner.link.length > 30
                        ? partner.link.slice(0, 30) + "..."
                        : partner.link}
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No link</span>
                  )}
                </td>
                <td className="p-4 flex gap-2">

                  <button
                    onClick={() => handleDelete(partner._id)}
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

export default Partnership;
