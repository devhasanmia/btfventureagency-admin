import { useCreateTeamMutation } from "../redux/api/teams/team";
import { toast } from "sonner";
import TeamForm, { type FormValues } from "./TeamForm";
import { Link } from "react-router";
import { FiArrowLeft } from "react-icons/fi";

const AddTeam = () => {
  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleAddSubmit = async (data: FormValues) => {
    const { picture, ...rest } = data;
    const formData = new FormData();

    Object.entries(rest).forEach(([key, value]) => {
      if (key.startsWith("socials")) return;
      formData.append(key, value || "");
    });

    if (picture && picture.length > 0) {
      formData.append("picture", picture[0]);
    }

    const socials = ["facebook", "linkedin", "twitter", "telegram", "discord", "github", "website"];
    socials.forEach((platform) => {
      formData.append(`socials[${platform}]`, (data[platform as keyof FormValues] as string) || "");
    });

    try {
      const result = await createTeam(formData as any).unwrap();
      toast.success(result.message);
    } catch (error: any) {
      toast.warning(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Add Team Member</h2>
        <Link to="/teams" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm">
          <FiArrowLeft size={18} /> Back to List
        </Link>
      </div>
      <TeamForm onSubmit={handleAddSubmit} isSubmitting={isLoading} />
    </div>
  );
};

export default AddTeam;
