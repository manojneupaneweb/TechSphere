import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { FiUsers, FiShoppingCart, FiDollarSign, FiPackage, FiTrendingUp, FiRefreshCw, FiEye, FiPlus, FiLayers, FiTag } from "react-icons/fi";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {


  
  const stats = [
    { title: "Users", value: 450, change: "+12%", icon: <FiUsers size={24} />, color: "bg-emerald-500" },
    { title: "Orders", value: 350, change: "+8%", icon: <FiShoppingCart size={24} />, color: "bg-blue-500" },
    { title: "Customers", value: 3850, change: "+5%", icon: <FiUsers size={24} />, color: "bg-amber-500" },
    { title: "New Users", value: 120, change: "+24%", icon: <FiTrendingUp size={24} />, color: "bg-purple-500" },
    { title: "Revenue", value: "$45K", change: "+18%", icon: <FiDollarSign size={24} />, color: "bg-orange-500" },
    { title: "Pending Orders", value: 25, change: "-3%", icon: <FiPackage size={24} />, color: "bg-teal-500" },
    { title: "Refund Requests", value: 8, change: "+2%", icon: <FiRefreshCw size={24} />, color: "bg-rose-500" },
    { title: "Product Views", value: 1200, change: "+32%", icon: <FiEye size={24} />, color: "bg-pink-500" },
  ];

  const quickActions = [
    { title: "All Products", path: "/admin/all-product", icon: <FiPackage size={18} />, color: "bg-rose-100 text-rose-600" },
    { title: "Add Products", path: "/admin/add-product", icon: <FiPlus size={18} />, color: "bg-amber-100 text-amber-600" },
    { title: "Add Categories", path: "/admin/add-category", icon: <FiLayers size={18} />, color: "bg-emerald-100 text-emerald-600" },
    { title: "Add Brands", path: "/admin/add-brand", icon: <FiTag size={18} />, color: "bg-blue-100 text-blue-600" },
    { title: "Customers", path: "/admin/customers", icon: <FiUsers size={18} />, color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
      >
        {quickActions.map((action, index) => (
          <motion.a
            key={index}
            whileHover={{ y: -5 }}
            href={action.path}
            className={`${action.color} p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center`}
          >
            <div className="mb-2">{action.icon}</div>
            <span className="text-sm font-medium text-center">{action.title}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className={`${stat.color} rounded-xl shadow-md overflow-hidden text-white`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium opacity-80">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
          <div className="h-80">
            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                  {
                    label: 'Revenue',
                    data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3,
                    fill: true
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales</h3>
          <div className="h-80">
            <Bar
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                  {
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderRadius: 4
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-10 bg-white p-6 rounded-xl shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <FiShoppingCart className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">New order #ORD-00{item}23</p>
                <p className="text-sm text-gray-500">Customer placed a new order</p>
                <p className="text-xs text-gray-400 mt-1">2{item} minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;