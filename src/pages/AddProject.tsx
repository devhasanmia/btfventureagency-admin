import React from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "sonner";
import { useCreateRecentlyWorkingMutation } from "../redux/api/recently-working/recently-working";

type ProjectFormInputs = {
    picture: FileList;
    name: string;
    description: string;
    launch: string;
    status: "Live" | "Upcoming";
    link?: string;
};

const AddProject: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProjectFormInputs>();

    const [createRecentlyWorking, { isLoading }] = useCreateRecentlyWorkingMutation();

    const onSubmit = async (data: ProjectFormInputs) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("launch", data.launch);
            formData.append("status", data.status);
            if (data.link) {
                formData.append("link", data.link);
            }
            if (data.picture && data.picture[0]) {
                formData.append("picture", data.picture[0]);
            }

            const result = await createRecentlyWorking(formData as any).unwrap();
            toast.success(result.message || "Project added successfully");
            reset();
        } catch (error: any) {
            toast.warning(error?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900">Add Project</h2>
                <Link
                    to="/recently-working"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                >
                    <FiArrowLeft size={18} /> Back to Recent Working
                </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Picture */}
                    <div>
                        <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Picture <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="picture"
                            type="file"
                            accept="image/*"
                            {...register("picture", { required: "Profile picture is required" })}
                            className={`w-full border rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.picture ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.picture && <p className="text-sm text-red-600">{errors.picture.message}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            {...register("name", { required: "Name is required" })}
                            className={`w-full border rounded-lg px-4 py-2 ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            placeholder="Enter full name"
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    {/* Launch Date */}
                    <div>
                        <label htmlFor="launch" className="block text-sm font-medium text-gray-700 mb-1">
                            Launch Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="launch"
                            type="date"
                            {...register("launch", { required: "Launch date is required" })}
                            className={`w-full border rounded-lg px-4 py-2 ${errors.launch ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.launch && <p className="text-sm text-red-600">{errors.launch.message}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="status"
                            {...register("status", { required: "Status is required" })}
                            className={`w-full border rounded-lg px-4 py-2 ${errors.status ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        >
                            <option value="">Select status</option>
                            <option value="Live">Live</option>
                            <option value="Upcoming">Upcoming</option>
                        </select>
                        {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
                    </div>

                    {/* Project Link (optional) */}
                    <div>
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                            Project Link
                        </label>
                        <input
                            id="link"
                            type="url"
                            {...register("link")}
                            placeholder="https://project-link.com"
                            className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2 lg:col-span-3">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            {...register("description", {
                                required: "Description is required",
                            })}
                            placeholder="Enter short description (max 100 characters)"
                            className={`w-full border rounded-lg px-4 py-2 ${errors.description ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
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
                        {isLoading ? "Loading..." : (
                            <>
                                <FiSave /> Save Project
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddProject;
