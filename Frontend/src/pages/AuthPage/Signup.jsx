import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("phone", formData.phone);
    if (formData.profilePicture) {
      form.append("profilePicture", formData.profilePicture);
    }
    console.log(formData.profilePicture);


    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/user/registeruser", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      setNotification({ message: "Registration Successful!", type: "success" });
      navigate('/auth/login');
      setLoading(false);
    } catch (error) {
      console.error("Error registering user:", error);
      setNotification({ message: "Error registering user!", type: "error" });

      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-5 right-5 p-3 rounded-lg text-white transition-all duration-300 ${notification.type === "success"
            ? "bg-green-500"
            : "bg-red-500"
            }`}
          style={{
            width: notification.message.length > 20 ? "300px" : "200px",
          }}
        >
          {notification.message}
        </div>
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
              />
            </div>

            <div className="mt-2">
              <label className="block text-gray-700">Phone</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your phone"
              />
            </div>

            <div className="mt-2">
              <label className="block text-gray-700">Your Photo</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <button className="w-1/2 flex items-center justify-center border border-gray-300 p-3 rounded-lg hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="ml-2">Google</span>
            </button>
            <button className="w-1/2 flex items-center justify-center border border-gray-300 p-3 rounded-lg hover:bg-gray-100">
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
            <a href="/auth/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
