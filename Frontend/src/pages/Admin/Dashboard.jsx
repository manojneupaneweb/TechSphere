import React from "react";
import { Line } from "react-chartjs-2"; // Chart.js for charts
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// import { ChevronRightIcon, PencilIcon, ClipboardListIcon } from "@heroicons/react/24/solid";

// Registering the necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Sample chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Total Sales",
        data: [1000, 2000, 3000, 2500, 3500, 4000],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: Total Visitors */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Total Visitors</h3>
          <Line data={chartData} />
        </div>

        {/* Section 2: Sales Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-green-600 mb-4">Sales Overview</h3>
          <Line data={chartData} />
        </div>

        {/* Section 3: Orders Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Orders Summary</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>New Orders:</span> <span className="font-bold">120</span>
            </li>
            <li className="flex justify-between">
              <span>Completed Orders:</span> <span className="font-bold">98</span>
            </li>
            <li className="flex justify-between">
              <span>Abandoned Carts:</span> <span className="font-bold">22</span>
            </li>
          </ul>
        </div>

        {/* Section 4: Marketing Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">Marketing Stats</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Email Campaigns Sent:</span> <span className="font-bold">300</span>
            </li>
            <li className="flex justify-between">
              <span>Click-Through Rate:</span> <span className="font-bold">5%</span>
            </li>
            <li className="flex justify-between">
              <span>Conversion Rate:</span> <span className="font-bold">1.5%</span>
            </li>
          </ul>
        </div>

        {/* Section 5: Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="flex items-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              {/* <PencilIcon className="h-5 w-5 mr-2" /> Add Product */}
            </button>
            <button className="flex items-center w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
              {/* <ClipboardListIcon className="h-5 w-5 mr-2" /> View Orders */}
            </button>
          </div>
        </div>

        {/* Section 6: User Engagement */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-4">User Engagement</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Active Users:</span> <span className="font-bold">4500</span>
            </li>
            <li className="flex justify-between">
              <span>New Comments:</span> <span className="font-bold">120</span>
            </li>
            <li className="flex justify-between">
              <span>Likes:</span> <span className="font-bold">350</span>
            </li>
          </ul>
        </div>

        {/* Section 7: Revenue Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Revenue Overview</h3>
          <p>Total Revenue: <span className="font-bold text-lg">$150,000</span></p>
          <p>Revenue this Month: <span className="font-bold text-lg">$12,500</span></p>
        </div>

        {/* Section 8: Notification Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">Notification Stats</h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Unread Notifications:</span> <span className="font-bold">25</span>
            </li>
            <li className="flex justify-between">
              <span>Sent Notifications:</span> <span className="font-bold">150</span>
            </li>
            <li className="flex justify-between">
              <span>Important Notifications:</span> <span className="font-bold">5</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
