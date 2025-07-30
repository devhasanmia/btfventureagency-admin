// src/pages/EditTeam.tsx
import { useParams, Link } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { useGetSingleTeamQuery, useUpdateTeamMutation } from "../redux/api/teams/team";
import TeamForm, { type FormValues } from "./TeamForm";
import { toast } from "sonner";

const EditTeam = () => {
  const { teamId } = useParams();
  const { data: teamData, isLoading: isFetching } = useGetSingleTeamQuery(teamId);
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTeamMutation();

  if (isFetching) return <p className="text-center py-10">Loading...</p>;
  if (!teamData) return <p className="text-center text-red-500">Team member not found.</p>;

  const defaultValues: Partial<FormValues> = {
    name: teamData.name,
    email: teamData.email,
    designation: teamData.designation,
    bio: teamData.bio,
    facebook: teamData.socials?.facebook,
    linkedin: teamData.socials?.linkedin,
    twitter: teamData.socials?.twitter,
    telegram: teamData.socials?.telegram,
    discord: teamData.socials?.discord,
    github: teamData.socials?.github,
    website: teamData.socials?.website,
  };

  const handleEditSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("designation", data.designation);
    formData.append("bio", data.bio || "");

    if (data.picture && data.picture.length > 0) {
      formData.append("picture", data.picture[0]);
    }

    const socials = ["facebook", "linkedin", "twitter", "telegram", "discord", "github", "website"];
    socials.forEach((platform) => {
      formData.append(`socials[${platform}]`, (data[platform as keyof FormValues] as string) || "");
    });

    try {
      const result = await updateTeam({ id: teamId, data: formData }).unwrap();
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update member");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Edit Team Member</h2>
        <Link to="/teams" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm">
          <FiArrowLeft size={18} /> Back to List
        </Link>
      </div>

      <TeamForm
        defaultValues={defaultValues}
        onSubmit={handleEditSubmit}
        submitLabel="Update Member"
        isSubmitting={isUpdating}
      />
    </div>
  );
};

export default EditTeam;
