import React, { useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
 import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password validation: 8+ chars, 1 uppercase, 1 number, 1 special char
  const passwordValid = (pwd) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      pwd
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    if (!passwordValid(newPassword)) {
      toast.error(
        "Password must be at least 8 characters, include a capital letter, a number, and a special character."
      );
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("No access token found. Please log in again.");
        return;
      }
      const res = await axios.post(
        "api/v1/user/cheangepassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to update password.");
      } else {
        setSuccess("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FiLock className="text-blue-500" />
          Security Settings
        </h3>

        <form
          className="space-y-5 max-w-lg"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters, include a capital letter, a number, and a special character.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm">{success}</div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors"
          >
            Update Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Settings;