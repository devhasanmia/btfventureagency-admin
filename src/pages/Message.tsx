import { FiMail } from "react-icons/fi";

const messages = [
  {
    name: "Hasan Mia",
    email: "hasan@example.com",
    subject: "Web3 fundraising help",
    message:
      "I have a project that needs investor connections and CEX listing.",
    interest: "Fund Raising",
    projectSocial: "https://twitter.com/hasan_mia",
  },
  {
    name: "Rahim Uddin",
    email: "rahim@example.com",
    subject: "Marketing support",
    message: "Looking for influencer marketing services for our token launch.",
    interest: "Marketing",
  },
];

const Messages = () => {
  return (
    <div className="p-10">
      <h1 className="flex items-center gap-4 text-4xl font-extrabold text-indigo-700 mb-12 drop-shadow-sm">
        <FiMail className="text-indigo-500 text-5xl" />
        Contact Messages
      </h1>

      <div className="space-y-8 max-w-3xl mx-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow duration-400 border border-indigo-100"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <p className="text-2xl font-semibold text-indigo-900">
                {msg.name}
              </p>
              <a
                href={`mailto:${msg.email}`}
                className="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base mt-2 sm:mt-0 font-medium transition-colors"
              >
                {msg.email}
              </a>
            </div>

            <p className="mt-4 italic text-indigo-600 border-l-4 border-indigo-300 pl-5 font-medium">
              Subject: {msg.subject}
            </p>

            <p className="mt-3 font-semibold text-indigo-700">
              I&apos;m interested in:{" "}
              <span className="text-indigo-500 font-normal">
                {msg.interest || "N/A"}
              </span>
            </p>

            {msg.projectSocial && (
              <p className="mt-2">
                Project Social:{" "}
                <a
                  href={msg.projectSocial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:text-indigo-700 underline transition-colors"
                >
                  {msg.projectSocial}
                </a>
              </p>
            )}

            <p className="mt-6 text-indigo-900 leading-relaxed text-base tracking-wide">
              {msg.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
