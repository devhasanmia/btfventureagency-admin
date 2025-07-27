import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { Link } from "react-router";

const teamMembers = [
  {
    picture: "/images/team/rakib.jpg",
    name: "Rakib Hossain",
    email: "rakib@example.com",
    designation: "Lead Developer",
    bio: "Full-stack developer with expertise in MERN stack and scalable architecture.",
    socials: {
      linkedin: "https://linkedin.com/in/rakibhossain",
      discord: "https://discordapp.com/users/devrakib",
      github: "https://github.com/rakibhossain",
    },
  },
  {
    picture: "/images/team/rakib.jpg",
    name: "Rakib Hossain",
    email: "rakib@example.com",
    designation: "Lead Developer",
    bio: "Full-stack developer with expertise in MERN stack and scalable architecture.",
    socials: {
      linkedin: "https://linkedin.com/in/rakibhossain",
      discord: "https://discordapp.com/users/devrakib",
      github: "https://github.com/rakibhossain",
    },
  },
  {
    picture: "/images/team/rakib.jpg",
    name: "Rakib Hossain",
    email: "rakib@example.com",
    designation: "Lead Developer",
    bio: "Full-stack developer with expertise in MERN stack and scalable architecture.",
    socials: {
      linkedin: "https://linkedin.com/in/rakibhossain",
      discord: "https://discordapp.com/users/devrakib",
      github: "https://github.com/rakibhossain",
    },
  },
  {
    picture: "/images/team/rakib.jpg",
    name: "Rakib Hossain",
    email: "rakib@example.com",
    designation: "Lead Developer",
    bio: "Full-stack developer with expertise in MERN stack and scalable architecture.",
    socials: {
      linkedin: "https://linkedin.com/in/rakibhossain",
      discord: "https://discordapp.com/users/devrakib",
      github: "https://github.com/rakibhossain",
    },
  },
];

const Team = () => {
  return (
    <div className="p-6 w-full">
      {/* Header with Add button */}

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

      {/* Table */}
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
            {teamMembers.map((member, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
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
                <td className="p-4 space-x-2">
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={member.socials.discord}
                    target="_blank"
                    className="text-indigo-500 hover:underline"
                  >
                    Discord
                  </a>
                  <a
                    href={member.socials.github}
                    target="_blank"
                    className="text-gray-800 hover:underline"
                  >
                    GitHub
                  </a>
                </td>
                <td className="p-4 flex items-center gap-2">
                 
                  <button
                    onClick={() => alert("Delete Clicked")}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition"
                  >
                    <FiTrash2 /> Delete
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
