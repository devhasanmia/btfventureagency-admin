import { useState, useEffect, type ReactNode } from "react";
import {
  FaLinkedinIn,
  FaDiscord,
  FaTwitter,
  FaTelegramPlane,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useGetSocialLinksQuery, useUpdateSocialLinksMutation } from "../redux/api/social/social";
import { toast } from "sonner";

type Social = {
  name: string;
  href: string;
  icon: ReactNode;
};

const iconsMap: Record<string, ReactNode> = {
  linkedin: <FaLinkedinIn />,
  discord: <FaDiscord />,
  twitter: <FaTwitter />,
  telegram: <FaTelegramPlane />,
  email: <MdOutlineEmail />,
};

const SocialLink = () => {
  const { data, isLoading } = useGetSocialLinksQuery("");
  const [updateSocialLinks] = useUpdateSocialLinksMutation();

  const [socials, setSocials] = useState<Social[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [tempHref, setTempHref] = useState("");
  const [docId, setDocId] = useState<string>("");

  useEffect(() => {
    if (data?.data) {
      const d = data.data;
      setDocId(d._id);
      setSocials([
        { name: "LinkedIn", href: d.linkedin, icon: iconsMap.linkedin },
        { name: "Discord", href: d.discord, icon: iconsMap.discord },
        { name: "Twitter", href: d.twitter, icon: iconsMap.twitter },
        { name: "Telegram", href: d.telegram, icon: iconsMap.telegram },
        { name: "Email", href: d.email, icon: iconsMap.email },
      ]);
    }
  }, [data]);

  const startEditing = (index: number) => {
    setEditIndex(index);
    setTempHref(socials[index].href);
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setTempHref("");
  };

  const saveEditing = async (index: number) => {
    const updated = socials.map((item, i) =>
      i === index ? { ...item, href: tempHref } : item
    );

    const payload = {
      linkedin: updated.find((s) => s.name === "LinkedIn")?.href,
      discord: updated.find((s) => s.name === "Discord")?.href,
      twitter: updated.find((s) => s.name === "Twitter")?.href,
      telegram: updated.find((s) => s.name === "Telegram")?.href,
      email: updated.find((s) => s.name === "Email")?.href,
    };

    try {
      await updateSocialLinks({ id: docId, data: payload }).unwrap();
      toast.success(`${socials[index].name} updated successfully!`);
      setSocials(updated);
      cancelEditing();
    } catch (err) {
      toast.error("Failed to update social link");
      console.error(err);
    }
  };

  if (isLoading || !socials.length) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
        Social Links Management
      </h2>

      {socials.map((social, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-3 hover:shadow transition"
        >
          <div className="flex items-center gap-3">
            <div className="text-xl text-indigo-600 dark:text-indigo-400">
              {social.icon}
            </div>
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {social.name}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {editIndex === idx ? (
              <>
                <input
                  type="text"
                  className="px-2 py-1 rounded border text-sm text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:border-indigo-400 w-56"
                  value={tempHref}
                  onChange={(e) => setTempHref(e.target.value)}
                />
                <button
                  onClick={() => saveEditing(idx)}
                  className="text-green-600 hover:text-green-800"
                  title="Save"
                >
                  <FaSave />
                </button>
                <button
                  onClick={cancelEditing}
                  className="text-red-600 hover:text-red-800"
                  title="Cancel"
                >
                  <FaTimes />
                </button>
              </>
            ) : (
              <>
                <a
                  href={
                    social.name === "Email"
                      ? `mailto:${social.href}`
                      : social.href
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm hidden md:inline"
                >
                  {social.href.length > 30
                    ? social.href.slice(0, 30) + "..."
                    : social.href}
                </a>
                <button
                  onClick={() => startEditing(idx)}
                  className="text-gray-500 hover:text-indigo-600"
                  title="Edit"
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialLink;
