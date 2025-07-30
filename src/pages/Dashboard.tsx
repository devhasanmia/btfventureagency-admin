import { useGetDashoboardQuery } from "../redux/api/dashboard/dashboard";
import { FiUsers, FiBriefcase, FiPackage, FiActivity, FiMail } from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { MdMenuBook } from "react-icons/md";
const icons = [
  <FiBriefcase size={28} className="text-indigo-500" />,
  <FiUsers size={28} className="text-green-500" />,
  <FiPackage size={28} className="text-yellow-500" />,
  <FiActivity size={28} className="text-red-500" />,
  <FiMail size={28} className="text-purple-500" />,
  <MdMenuBook size={28} className="text-purple-500" />,
];

const Dashboard = () => {
  const { data: dashboardData, isLoading, error } = useGetDashoboardQuery("");

  const counts = dashboardData?.data;

  const cards = [
    { label: "Partnerships", value: counts?.totalPartnership || 0 },
    { label: "Team Members", value: counts?.totalTeam || 0 },
    { label: "Total Services", value: counts?.totalServices || 0 },
    { label: "Recently Worked", value: counts?.totalRecentlyWorking || 0 },
    { label: "Total Contacts", value: counts?.totalcontact || 0 },
    { label: "Total Blog", value: counts?.totalBlog || 0 },
  ];

  const chartData = cards.map((item) => ({
    name: item.label,
    value: item.value,
  }));

  const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

  if (isLoading)
    return (
      <p className="text-center text-gray-600 dark:text-white">Loading dashboard...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500">Failed to load dashboard data</p>
    );

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Dashboard Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition duration-300"
          >
            {/* Icon */}
            <div className="p-4 bg-indigo-100 dark:bg-indigo-800 rounded-xl flex items-center justify-center">
              {icons[idx]}
            </div>

            {/* Text content */}
            <div>
              <p className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <ChartWrapper title="Overview Chart">
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{ outline: "none" }}
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                innerRadius={50}
                label
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    style={{ outline: "none" }}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Bar Chart */}
        <ChartWrapper title="Detailed Counts">
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{ outline: "none" }}
          >
            <BarChart data={chartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                fill="url(#barGradient)"
                label={{ position: "top", fill: "#4F46E5", fontSize: 14 }}
                style={{ outline: "none" }}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Line Chart */}
        <ChartWrapper title="Growth Trend (Line)">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={3}
                style={{ outline: "none" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Area Chart */}
        <ChartWrapper title="Performance Overview (Area)">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                fillOpacity={1}
                fill="url(#colorValue)"
                style={{ outline: "none" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>
    </div>
  );
};

export default Dashboard;

// Reusable Wrapper Component
const ChartWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
    style={{ outline: "none" }}
    tabIndex={-1} // prevents focus outline on div
  >
    <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
      {title}
    </h2>
    {children}
  </div>
);
