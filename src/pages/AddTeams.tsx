import { useForm } from "react-hook-form";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { Link } from "react-router";
import { useCreateTeamMutation } from "../redux/api/teams/team";
import { toast } from "sonner";

type FormValues = {
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

const AddTeam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onTouched",
  });

  const [createTeam] = useCreateTeamMutation();

  const onSubmit = async (data: FormValues) => {
    const { picture, facebook, linkedin, twitter, telegram, discord, github, website, ...rest } = data;

    const formData = new FormData();
    formData.append("name", rest.name);
    formData.append("email", rest.email);
    formData.append("designation", rest.designation);
    formData.append("bio", rest.bio || "");

    if (picture && picture.length > 0) {
      formData.append("picture", picture[0]); // only one image
    }

    formData.append("socials[facebook]", facebook || "");
    formData.append("socials[linkedin]", linkedin || "");
    formData.append("socials[twitter]", twitter || "");
    formData.append("socials[telegram]", telegram || "");
    formData.append("socials[discord]", discord || "");
    formData.append("socials[github]", github || "");
    formData.append("socials[website]", website || "");

    try {
      const result = await createTeam(formData as any).unwrap();
      toast.success(result.message);
    } catch (error: any) {
      toast.warning(error?.data?.message || "Something went wrong");
    }
  };

  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\- ./?%&=]*)?$/;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Add Team Member</h2>
        <Link
          to="/teams"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          <FiArrowLeft size={18} /> Back to List
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className={`w-full border rounded-lg px-4 py-2 ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="Enter full name"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full border rounded-lg px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Designation */}
        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
            Designation <span className="text-red-500">*</span>
          </label>
          <input
            id="designation"
            {...register("designation", { required: "Designation is required" })}
            className={`w-full border rounded-lg px-4 py-2 ${errors.designation ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="Lead Developer"
          />
          {errors.designation && <p className="text-sm text-red-600">{errors.designation.message}</p>}
        </div>

        {/* Picture Upload */}
        <div>
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture <span className="text-red-500">*</span>
          </label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            {...register("picture", { required: "Profile picture is required" })}
            className={`w-full border rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
              errors.picture ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.picture && <p className="text-sm text-red-600">{errors.picture.message}</p>}
        </div>

        {/* Bio */}
        <div className="md:col-span-3">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            {...register("bio", {
              maxLength: {
                value: 300,
                message: "Bio cannot exceed 300 characters",
              },
            })}
            rows={4}
            className={`w-full border rounded-lg px-4 py-2 resize-none ${errors.bio ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="Short bio"
          />
          {errors.bio && <p className="text-sm text-red-600">{errors.bio.message}</p>}
        </div>

        {/* Social Links */}
        {[
          { label: "Facebook", name: "facebook" },
          { label: "LinkedIn", name: "linkedin" },
          { label: "Twitter", name: "twitter" },
          { label: "Telegram", name: "telegram" },
          { label: "Discord", name: "discord" },
          { label: "GitHub", name: "github" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={name}
              {...register(name as keyof FormValues, {
                pattern: {
                  value: urlPattern,
                  message: "Invalid URL",
                },
              })}
              className={`w-full border rounded-lg px-4 py-2 ${
                errors[name as keyof FormValues] ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder={`https://${label.toLowerCase()}.com/username`}
            />
            {errors[name as keyof FormValues] && (
              <p className="text-sm text-red-600">{errors[name as keyof FormValues]?.message}</p>
            )}
          </div>
        ))}

        {/* Website */}
        <div className="md:col-span-3">
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            id="website"
            {...register("website", {
              pattern: {
                value: urlPattern,
                message: "Invalid URL",
              },
            })}
            className={`w-full border rounded-lg px-4 py-2 ${errors.website ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="https://yourwebsite.com"
          />
          {errors.website && <p className="text-sm text-red-600">{errors.website.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <FiSave /> Save Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeam;
