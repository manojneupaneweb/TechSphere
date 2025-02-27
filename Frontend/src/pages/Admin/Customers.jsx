import React from "react";

function Customers() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Customers</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center border">
            <td className="p-3 border">John Doe</td>
            <td className="p-3 border">john@example.com</td>
            <td className="p-3 border">+977 1234567890</td>
            <td className="p-3 border">
              <span className="px-2 py-1 text-sm bg-green-200 text-green-800 rounded">
                Active
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
