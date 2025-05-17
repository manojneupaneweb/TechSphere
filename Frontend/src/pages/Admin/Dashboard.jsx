import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
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

  const barChartData = {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Units Sold",
        data: [500, 700, 400, 600],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Buttons */}
      <div className="flex my-5 justify-around">
        <a href="/admin/add-product" className="bg-red-500 text-white rounded-sm py-2 px-3">All Product</a>
        <a href="/admin/add-product" className="bg-yellow-500 text-white rounded-sm py-2 px-3">Add Product</a>
        <a href="/admin/add-product" className="bg-green-500 text-white rounded-sm py-2 px-3">Add Category</a>
        <a href="/admin/add-product" className="bg-blue-500 text-white rounded-sm py-2 px-3">Add Product</a>
        <a href="/admin/add-product" className="bg-orange-500 text-white rounded-sm py-2 px-3">Costumers</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10 px-4">
        <div className="bg-green-600 h-28 rounded-md shadow-md flex items-center justify-center text-white text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">450<br /><span className="text-sm">Users</span></p>
        </div>
        <div className="bg-blue-600 h-28 rounded-md shadow-md flex items-center justify-center text-white text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">350<br /><span className="text-sm">Orders</span></p>
        </div>
        <div className="bg-yellow-600 h-28 rounded-md shadow-md flex items-center justify-center text-white text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">3850<br /><span className="text-sm">Customers</span></p>
        </div>
        <div className="bg-purple-600 h-28 rounded-md shadow-md flex items-center justify-center text-white text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">120<br /><span className="text-sm">New Users Today</span></p>
        </div>
        <div className="bg-orange-600 h-28 rounded-md shadow-md flex items-center justify-center text-white text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">$45K<br /><span className="text-sm">Monthly Revenue</span></p>
        </div>
        <div className="bg-teal-600 h-28 rounded-md shadow-md flex items-center justify-center text-white text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">25<br /><span className="text-sm">Pending Orders</span></p>
        </div>
        <div className="bg-red-600 h-28 rounded-md shadow-md flex items-center justify-center text-white text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">8<br /><span className="text-sm">Refund Requests</span></p>
        </div>
        <div className="bg-pink-600 h-28 rounded-md shadow-md flex items-center justify-center text-white text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">1200<br /><span className="text-sm">Product Views</span></p>
        </div>

      </div>




      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Total Sales</h3>
          <Line data={chartData} />
        </div>

        {/* Section 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Product Performance</h3>
          <Bar data={barChartData} />
        </div>

        {/* Section 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Customer Growth</h3>
          <Line data={chartData} />
        </div>

        {/* Section 4 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Revenue Breakdown</h3>
          <Bar data={barChartData} />
        </div>

        {/* Section 5 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Monthly Expenses</h3>
          <Line data={chartData} />
        </div>

        {/* Section 6 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Top Products</h3>
          <Bar data={barChartData} />
        </div>

        {/* Section 7 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Market Trends</h3>
          <Line data={chartData} />
        </div>

        {/* Section 8 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Profit Margins</h3>
          <Bar data={barChartData} />
        </div>

        {/* Section 9 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">User Engagement</h3>
          <Line data={chartData} />
        </div>

        {/* Section 10 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-teal-600 mb-4">Sales by Region</h3>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
