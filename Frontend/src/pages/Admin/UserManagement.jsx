import React from "react";

function UserManagement() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">Achyut Neupane</td>
              <td className="py-3 px-6">achyut@example.com</td>
              <td className="py-3 px-6 text-center">Admin</td>
              <td className="py-3 px-6 text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
            {/* More users can be added dynamically */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
