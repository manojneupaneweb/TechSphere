import React from 'react';

const Users = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'User' },
    { id: 3, name: 'Mike Johnson', email: 'mikejohnson@example.com', role: 'User' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg overflow-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                  Edit
                </button>
                <button className="ml-2 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
