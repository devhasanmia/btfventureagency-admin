import React from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaTelegramPlane,
  FaDiscord,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router";
import {
  useDeleteTeamByIdMutation,
  useGetTeamQuery,
} from "../redux/api/teams/team";
import { toast } from "sonner";

interface TeamMember {
  _id: string;
  picture: string;
  name: string;
  email: string;
  designation: string;
  bio: string;
  socials?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    github?: string;
    website?: string;
  };
}

const Team: React.FC = () => {
  const { data } = useGetTeamQuery("");
  const [teamDelete] = useDeleteTeamByIdMutation();
  const handleTeamDelete = async (id: string) => {
    try {
    const result = await teamDelete(id).unwrap();
    toast.success(result?.message)
    } catch (error:any) {
       toast.warning(error?.data?.message);
    }
  };
  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Team Members</h2>
        <Link
          to="/add-teams"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <FiPlus size={20} />
          Add Team
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-4">Photo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Bio</th>
              <th className="p-4">Social</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((member: TeamMember, index: number) => (
              <tr
                key={member._id || index}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={member.picture}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="p-4 font-semibold">{member.name}</td>
                <td className="p-4 text-sm text-gray-600">{member.email}</td>
                <td className="p-4">{member.designation}</td>
                <td className="p-4 text-sm text-gray-600">
                  {member.bio.length > 10
                    ? member.bio.slice(0, 10) + "..."
                    : member.bio}
                </td>
                <td className="p-4 flex flex-wrap gap-2">
                  {member.socials?.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900"
                      title="Facebook"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                      title="LinkedIn"
                    >
                      <FaLinkedinIn />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:text-sky-700"
                      title="Twitter"
                    >
                      <FaTwitter />
                    </a>
                  )}
                  {member.socials?.telegram && (
                    <a
                      href={member.socials.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                      title="Telegram"
                    >
                      <FaTelegramPlane />
                    </a>
                  )}
                  {member.socials?.discord && (
                    <a
                      href={member.socials.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:text-indigo-700"
                      title="Discord"
                    >
                      <FaDiscord />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-black"
                      title="GitHub"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {member.socials?.website && (
                    <a
                      href={member.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800"
                      title="Website"
                    >
                      <FaGlobe />
                    </a>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleTeamDelete(member._id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition"
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

export default Team;
