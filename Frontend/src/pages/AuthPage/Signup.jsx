import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowPopup = ({ onVerify, onClose, loading }) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          className="p-2 mb-4 w-full border border-gray-300 rounded"
        />
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onVerify(otp)}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    profilePicture: null,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      setNotification({ message: "Please fill all required fields", type: "error" });
      setLoading(false);
      return;
    }

    try {
      await handleSendOtp();
    } catch (error) {
      console.error("Error during signup:", error);
      setNotification({ message: "An error occurred during signup", type: "error" });
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      await axios.post("api/v1/user/sendotp", {
        email: formData.email,
      });
      setNotification({ message: "OTP sent to your email.", type: "success" });
      setShowPopup(true);
    } catch (error) {
      console.error("Send OTP Error:", error);
      setNotification({
        message: error.response?.data?.message || "Failed to send OTP",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndRegister = async (otp) => {
    try {
      setLoading(true);
      const verifyRes = await axios.post("api/v1/user/verifyotp", {
        email: formData.email,
        otp: otp,
      });

      if (verifyRes.data.success) {
        setShowPopup(false);
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            form.append(key, value);
          }
        });

        const registerRes = await axios.post(
          "api/v1/user/register",
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setNotification({ message: "Registration Successful!", type: "success" });
        setShowPopup(false);
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    } catch (error) {
      console.error("OTP Verification or Registration Failed:", error);
      setNotification({
        message: error.response?.data?.message || "OTP Verification Failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {/* Notification Box */}
      {notification.message && (
        <div
          className={`fixed top-5 right-5 p-3 rounded-lg text-white shadow-lg transition-all duration-300 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ width: "auto", minWidth: "200px", maxWidth: "300px" }}
        >
          {notification.message}
        </div>
      )}

      {/* ShowPopup Component */}
      {showPopup && (
        <ShowPopup
          onVerify={handleVerifyOtpAndRegister}
          onClose={() => setShowPopup(false)}
          loading={loading}
        />
      )}

      <div className="flex max-w-4xl rounded-2xl bg-white shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="hidden w-1/2 bg-blue-500 p-10 text-white md:flex flex-col justify-center">
          <h2 className="text-3xl font-bold">
            Join TechSphere and Manage with Ease.
          </h2>
          <p className="mt-4">
            Create an account to explore tech gadgets and more.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-5">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create an Account
          </h2>
          <p className="text-gray-500 text-center">
            Sign up to start exploring TechSphere
          </p>

          <form className="mt-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mt-2">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mt-2">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="mt-2">
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your phone"
                required
              />
            </div>

            <div className="mt-2">
              <label className="block text-gray-700">Your Photo (Optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-500 p-2 text-white font-bold hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm text-white"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-500 text-center">Or Sign up with</span>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              type="button"
              className="w-1/2 flex items-center justify-center border border-gray-300 p-3 rounded-lg hover:bg-gray-100"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="ml-2">Google</span>
            </button>
            <button
              type="button"
              className="w-1/2 flex items-center justify-center border border-gray-300 p-3 rounded-lg hover:bg-gray-100"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span className="ml-2">Facebook</span>
            </button>
          </div>

          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;