import React from "react";
import { useForm } from "react-hook-form";
import { FiSave } from "react-icons/fi";
import { toast } from "sonner";
import { useCreateServiceMutation } from "../redux/api/ourservice/ourservice";

type ServiceFormInputs = {
    name: string;
    link?: string;
};

const AddService: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ServiceFormInputs>();
    const [createService] = useCreateServiceMutation()
    const onSubmit = async (data: ServiceFormInputs) => {
        try {
            const result = await createService(data).unwrap();
            toast.success(result.message);
            reset();
        } catch (error: any) {
            toast.warning(error?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Service</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field (Required) */}
                <div>
                    <label className="block mb-1 font-medium">Name<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        {...register("name", { required: "Service name is required" })}
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter service name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Link Field (Optional) */}
                <div>
                    <label className="block mb-1 font-medium">Link</label>
                    <input
                        type="url"
                        {...register("link")}
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter service link (optional)"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    <FiSave /> Save Service
                </button>
            </form>
        </div>
    );
};

export default AddService;
