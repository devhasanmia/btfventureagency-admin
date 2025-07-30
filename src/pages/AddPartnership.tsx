import React from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "sonner";
import { useCreatePartnershipMutation } from "../redux/api/partnership/partnership";

type PartnershipFormInputs = {
  name: string;
  logo: FileList;
  link?: string;
};

const AddPartnership: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PartnershipFormInputs>();

  const [createPartnership, { isLoading }] = useCreatePartnershipMutation();

  const onSubmit = async (data: PartnershipFormInputs) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.link) {
        formData.append("link", data.link);
      }
      if (data.logo && data.logo[0]) {
        formData.append("logo", data.logo[0]);
      }
      
      const result = await createPartnership(formData as any).unwrap();
      console.log(formData)
      toast.success(result.message);
      reset();
    } catch (error: any) {
      toast.warning(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add Partnership</h2>
        <Link
          to="/partnership"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          <FiArrowLeft size={18} /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Logo */}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
            Logo <span className="text-red-500">*</span>
          </label>
          <input
            id="logo"
            type="file"
            accept="image/*"
            {...register("logo", { required: "Logo is required" })}
            className={`w-full border rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
              errors.logo ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.logo && <p className="text-sm text-red-600 mt-1">{errors.logo.message}</p>}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter partner name"
            className={`w-full border rounded-lg px-4 py-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>

        {/* Link (optional) */}
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
            Website Link
          </label>
          <input
            id="link"
            type="url"
            placeholder="https://partner-website.com"
            {...register("link", {
              pattern: {
                value: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}.*$/,
                message: "Enter a valid URL",
              },
            })}
            className={`w-full border rounded-lg px-4 py-2 ${
              errors.link ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.link && <p className="text-sm text-red-600 mt-1">{errors.link.message}</p>}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : (
              <>
                <FiSave /> Save Partnership
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPartnership;
