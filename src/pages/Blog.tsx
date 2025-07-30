import { FiTrash2, FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { useDeleteBlogByIdMutation, useGetAllBlogQuery } from "../redux/api/blog/blog";
import { toast } from "sonner";

const truncateText = (text: string, length = 40) =>
  text.length > length ? text.slice(0, length) + "..." : text;

const Blog = () => {
  const { data: blogs } = useGetAllBlogQuery("")

  const [deleteBlog] = useDeleteBlogByIdMutation()
  const handleDelete = async (id: number) => {
    try {
      const result = await deleteBlog(id).unwrap();
      toast.success(result?.message)
    } catch (error: any) {
      toast.warning(error?.data?.message);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Blogs</h2>
        <Link
          to="/add-blog"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <FiPlus size={20} />
          Add Blog
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">Picture</th>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.data?.map(({ _id, title, description, picture }: any) => (
              <tr key={_id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={picture}
                    alt={title}
                    className="w-20 h-14 object-cover rounded-md"
                  />
                </td>
                <td className="p-4 font-semibold">{title}</td>
                <td className="p-4 text-sm text-gray-600">
                  {truncateText(description)}
                </td>
                <td className="p-4 flex gap-2">
                  {/* <button
                    // onClick={() => handleEdit(id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-md text-sm font-medium transition"
                  >
                    <FiEdit />
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(_id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {blogs?.data?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blog;
