import React from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "sonner";
import { useCreateBlogMutation } from "../redux/api/blog/blog";
// import { useCreateBlogMutation } from "../redux/api/blog/blogApi"; // <-- ঠিক path ব্যবহার করো

type BlogFormInputs = {
  picture: FileList;
  title: string;
  description: string;
  category?: string;
  tags?: string;
};

const AddBlog: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormInputs>();

  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const onSubmit = async (data: BlogFormInputs) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.category) formData.append("category", data.category);
      if (data.tags) formData.append("tags", data.tags);
      if (data.picture && data.picture[0]) {
        formData.append("picture", data.picture[0]);
      }

      const result = await createBlog(formData as any).unwrap();
      toast.success(result.message || "Blog created successfully");
      reset();
    } catch (error: any) {
      toast.warning(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Add Blog</h2>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          <FiArrowLeft size={18} /> Back to Blog List
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Picture */}
          <div>
            <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-1">
              Blog Image <span className="text-red-500">*</span>
            </label>
            <input
              id="picture"
              type="file"
              accept="image/*"
              {...register("picture", { required: "Image is required" })}
              className={`w-full border rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.picture ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.picture && <p className="text-sm text-red-600">{errors.picture.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`w-full border rounded-lg px-4 py-2 ${errors.title ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter blog title"
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              id="category"
              {...register("category")}
              className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Technology"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              {...register("tags")}
              className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. React,JavaScript,Web"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                maxLength: { value: 1000, message: "Maximum 1000 characters allowed" },
              })}
              placeholder="Write your blog content here..."
              className={`w-full border rounded-lg px-4 py-2 ${errors.description ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              rows={5}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : (
              <>
                <FiSave /> Save Blog
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
