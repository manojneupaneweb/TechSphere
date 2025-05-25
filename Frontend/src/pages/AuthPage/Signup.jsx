import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// OTP Popup Component with timer and resend functionality
const ShowPopup = ({ onVerify, onClose, loading, onResend }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    // Exit early when we reach 0
    if (timeLeft <= 0) {
      setShowResend(true);
      return;
    }

    // Set up the timer
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    try {
      await onResend();
      setTimeLeft(300); // Reset timer
      setShowResend(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">OTP Verification</h2>
        <p className="text-gray-600 mb-4">Enter the 6-digit code sent to your email</p>
        
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          className="p-3 mb-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          maxLength={6}
        />
        
        <div className="mb-4 text-sm text-gray-500">
          {!showResend ? (
            <span>Code expires in: <span className="font-medium">{formatTime(timeLeft)}</span></span>
          ) : (
            <span className="text-red-500">OTP has expired</span>
          )}
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          
          {!showResend ? (
            <button
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => onVerify(otp)}
              disabled={loading || otp.length < 6}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          ) : (
            <button
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Password validation helper
const validatePassword = (password) => {
  // At least 8 characters, at least one number, one special char, one uppercase, one lowercase
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
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
  const [passwordTouched, setPasswordTouched] = useState(false);

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
    if (name === "password") setPasswordTouched(true);
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      setNotification({ message: "Please fill all required fields", type: "error" });
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setNotification({
        message: "Password must be 8+ chars, include uppercase, lowercase, number, and special character.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      await handleSendOtp();
    } catch (error) {
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
      setNotification({
        message: error.response?.data?.message || "Failed to send OTP",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      await axios.post("api/v1/user/sendotp", {
        email: formData.email,
      });
      setNotification({ message: "New OTP sent to your email.", type: "success" });
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Failed to resend OTP",
        type: "error",
      });
      throw error;
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

        await axios.post("api/v1/user/register", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setNotification({ message: "Registration Successful!", type: "success" });
        setShowPopup(false);
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "OTP Verification Failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const passwordValid = validatePassword(formData.password);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-2">
      {/* Notification Box */}
      {notification.message && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-xl text-white shadow-xl transition-all duration-300 z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ minWidth: "220px", maxWidth: "320px" }}
        >
          {notification.message}
        </div>
      )}

      {/* OTP Popup */}
      {showPopup && (
        <ShowPopup
          onVerify={handleVerifyOtpAndRegister}
          onClose={() => setShowPopup(false)}
          loading={loading}
          onResend={handleResendOtp}
        />
      )}

      <div className="flex flex-col md:flex-row max-w-4xl w-full rounded-3xl bg-white shadow-2xl overflow-hidden animate-fadeIn">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-10 text-white flex-col justify-center items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="TechSphere"
            className="w-28 h-28 mb-6 rounded-full shadow-lg border-4 border-white"
          />
          <h2 className="text-4xl font-extrabold mb-2 drop-shadow-lg">
            Join TechSphere
          </h2>
          <p className="text-lg opacity-90 mb-4 text-center">
            Create an account to explore tech gadgets and more.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Secure</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Modern</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Community</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-1">
            Create an Account
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Sign up to start exploring TechSphere
          </p>

          <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => setPasswordTouched(true)}
                className={`w-full rounded-lg border p-3 focus:outline-none transition ${
                  passwordTouched
                    ? passwordValid
                      ? "border-green-400 focus:ring-2 focus:ring-green-400"
                      : "border-red-400 focus:ring-2 focus:ring-red-400"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                }`}
                placeholder="Create a password"
                required
              />
              {passwordTouched && (
                <div className="mt-1 flex items-center gap-2 text-sm">
                  {passwordValid ? (
                    <span className="text-green-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Strong password
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      min 8 chars, uppercase, lowercase, number, special char
                    </span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Your phone"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Photo (Optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                accept="image/*"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-3 text-white font-bold hover:from-blue-600 hover:to-purple-600 transition text-lg shadow-md"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
};

export default Signup;