import React, { useState } from 'react';

const Settings = () => {
  const [profile, setProfile] = useState({
    username: 'admin123',
    email: 'admin@example.com',
  });

  const [notifications, setNotifications] = useState(true);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    setNotifications(e.target.checked);
  };

  const handlePasswordChange = (e) => {
    // Add password change logic here
    e.preventDefault();
    alert('Password changed!');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg overflow-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Profile Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Notification Preferences Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="flex items-center space-x-4">
          <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
            Enable Notifications
          </label>
          <input
            type="checkbox"
            id="notifications"
            checked={notifications}
            onChange={handleNotificationChange}
            className="w-6 h-6"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
