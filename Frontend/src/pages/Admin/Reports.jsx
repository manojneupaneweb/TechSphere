import React from 'react';

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Reports</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Generate Report
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                Filter
              </button>
              <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Report Name</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-700">Annual Financial Report</td>
                  <td className="py-4 px-6 text-sm text-gray-700">2025-02-01</td>
                  <td className="py-4 px-6 text-sm text-gray-700">Completed</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <button className="text-blue-500">View</button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-700">Sales Report</td>
                  <td className="py-4 px-6 text-sm text-gray-700">2025-02-15</td>
                  <td className="py-4 px-6 text-sm text-gray-700">In Progress</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <button className="text-blue-500">View</button>
                  </td>
                </tr>
                {/* Add more rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
