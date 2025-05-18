import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation rules
  const validationRules = [
    { id: 1, text: "At least 8 characters", regex: /.{8,}/ },
    { id: 2, text: "At least 1 uppercase letter", regex: /[A-Z]/ },
    { id: 3, text: "At least 1 number", regex: /[0-9]/ },
    { id: 4, text: "At least 1 special character", regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/ }
  ];

  // Check which rules are satisfied
  const getValidationStatus = () => {
    return validationRules.map(rule => ({
      ...rule,
      valid: rule.regex.test(newPassword)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }


    const allValid = getValidationStatus().every(rule => rule.valid);
    if (!allValid) {
      toast.error("Please meet all password requirements.");
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
      
      if (res.status >= 200 && res.status < 300) {
        toast.success("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = res.data;
        toast.error(data.message || "Failed to update password.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <ToastContainer position="top-center" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <FiLock className="text-blue-600 text-xl" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">Security Settings</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <FiEyeOff className="text-gray-500 hover:text-gray-700" />
                ) : (
                  <FiEye className="text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <FiEyeOff className="text-gray-500 hover:text-gray-700" />
                ) : (
                  <FiEye className="text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
            
            {/* Password Validation Rules */}
            <div className="mt-2 space-y-1">
              {getValidationStatus().map((rule) => (
                <div key={rule.id} className="flex items-center">
                  {rule.valid ? (
                    <FiCheck className="text-green-500 mr-2" />
                  ) : (
                    <FiX className="text-red-500 mr-2" />
                  )}
                  <span className={`text-xs ${rule.valid ? 'text-green-600' : 'text-gray-500'}`}>
                    {rule.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-gray-500 hover:text-gray-700" />
                ) : (
                  <FiEye className="text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
          >
            <FiLock />
            Update Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Settings;