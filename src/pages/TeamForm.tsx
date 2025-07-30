import { useForm } from "react-hook-form";
import { FiSave } from "react-icons/fi";
import { useEffect } from "react";
import { toast } from "sonner";

export type FormValues = {
  name: string;
  email: string;
  designation: string;
  bio: string;
  picture?: FileList;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  github?: string;
  website?: string;
};

type Props = {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
};

const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\- ./?%&=]*)?$/;

const TeamForm = ({ defaultValues = {}, onSubmit, isSubmitting, submitLabel = "Save Member" }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues,
  });

  // If you want to set picture manually during edit, you can handle that here

  useEffect(() => {
    if (defaultValues) {
      for (const [key, value] of Object.entries(defaultValues)) {
        setValue(key as keyof FormValues, value);
      }
    }
  }, [defaultValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          {...register("name", { required: "Name is required" })}
          className={`w-full border rounded-lg px-4 py-2 ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400`}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          className={`w-full border rounded-lg px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400`}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {/* Designation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
        <input
          {...register("designation", { required: "Designation is required" })}
          className={`w-full border rounded-lg px-4 py-2 ${errors.designation ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400`}
        />
        {errors.designation && <p className="text-sm text-red-600">{errors.designation.message}</p>}
      </div>

      {/* Picture */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture *</label>
        <input
          type="file"
          accept="image/*"
          {...register("picture", { required: !defaultValues?.picture && "Profile picture is required" })}
          className={`w-full border rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
            errors.picture ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.picture && <p className="text-sm text-red-600">{errors.picture.message}</p>}
      </div>

      {/* Bio */}
      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          {...register("bio", {
            maxLength: { value: 150, message: "Bio cannot exceed 150 characters" },
          })}
          rows={4}
          className={`w-full border rounded-lg px-4 py-2 resize-none ${errors.bio ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400`}
        />
        {errors.bio && <p className="text-sm text-red-600">{errors.bio.message}</p>}
      </div>

      {/* Socials */}
      {["facebook", "linkedin", "twitter", "telegram", "discord", "github"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            {...register(field as keyof FormValues, {
              pattern: { value: urlPattern, message: "Invalid URL" },
            })}
            className={`w-full border rounded-lg px-4 py-2 ${
              errors[field as keyof FormValues] ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-400`}
          />
          {errors[field as keyof FormValues] && (
            <p className="text-sm text-red-600">{errors[field as keyof FormValues]?.message}</p>
          )}
        </div>
      ))}

      {/* Website */}
      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
        <input
          {...register("website", {
            pattern: { value: urlPattern, message: "Invalid URL" },
          })}
          className={`w-full border rounded-lg px-4 py-2 ${errors.website ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400`}
        />
        {errors.website && <p className="text-sm text-red-600">{errors.website.message}</p>}
      </div>

      {/* Submit */}
      <div className="md:col-span-3 mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          <FiSave /> {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default TeamForm;
