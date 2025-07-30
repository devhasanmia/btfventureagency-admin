import {
  FiX,
  FiLogOut,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiBriefcase,
  FiClock,
  FiFileText,
  FiMail,
} from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/services/auth/authSlice";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  { name: "Dashboard", icon: <FiBarChart2 />, path: "/dashboard" },
  { name: "Teams", icon: <FiUsers />, path: "/teams" },
  {
    name: "Services",
    icon: <FiSettings />,
    path: "/services",
  },
  { name: "Partnership", icon: <FiBriefcase />, path: "/partnership" },
  { name: "Recently Working", icon: <FiClock />, path: "/recently-working" },
  { name: "Blogs", icon: <FiFileText />, path: "/blogs" },
  { name: "Messages", icon: <FiMail />, path: "/messages" },
  {
    name: "Social Link", icon: <IoIosLink/>, path: "/social-link"
  }
];

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useAppSelector((state)=> state.auth.user)
  const dispatch = useAppDispatch();
  return (
    <aside 
      className={`fixed md:relative z-40 h-full w-72 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 flex flex-col justify-between`}
    >
      {/* Sidebar Top */}
      <div className="flex items-center justify-between p-6 border-gray-200">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Admin Panel
        </h1>
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 ">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded hover:bg-green-50 hover:text-green-700 text-lg font-medium transition"
            onClick={() => setSidebarOpen(false)} 
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-5 flex items-center gap-4">
        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
          <img src={user?.picture} alt="" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-green-700">Admin</p>
          <p className="text-sm text-gray-500">{user?.name}</p>
        </div>
        <button
          className="text-red-500 hover:text-red-700 transition cursor-pointer"
          aria-label="Logout"
          onClick={()=> dispatch(logout())}
        >
          <FiLogOut className="text-xl" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
