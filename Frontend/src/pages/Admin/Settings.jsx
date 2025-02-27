import React from "react";

function Settings() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
          <label className="block mb-2">
            Name:
            <input type="text" className="w-full p-2 border rounded mt-1" placeholder="Enter your name" />
          </label>
          <label className="block mb-2">
            Email:
            <input type="email" className="w-full p-2 border rounded mt-1" placeholder="Enter your email" />
          </label>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Save</button>
        </div>

        {/* Security Settings */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
          <label className="block mb-2">
            Change Password:
            <input type="password" className="w-full p-2 border rounded mt-1" placeholder="New password" />
          </label>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Update Password</button>
        </div>

        {/* Notifications */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable email notifications
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
