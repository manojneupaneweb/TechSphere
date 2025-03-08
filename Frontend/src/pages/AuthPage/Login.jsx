import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user/login", data, {
        withCredentials: true,
      });
      
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      toast.success("Login successful!", { position: "top-right" });
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again!",
        { position: "top-right" }
      );
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
      <div className="flex max-w-4xl rounded-2xl bg-white shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="hidden w-1/2 bg-orange-500 p-10 text-white md:flex flex-col justify-center">
          <h2 className="text-3xl font-bold">
            Simplify management with our dashboard.
          </h2>
          <p className="mt-4">
            Simplify your e-commerce management with our user-friendly admin
            dashboard.
          </p>
          <div className="mt-6 flex space-x-4">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-black text-lg font-semibold">
              👨‍💼
            </div>
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-black text-lg font-semibold">
              👩‍💼
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500">Please login to your account</p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                required
                value={data.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                value={data.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="mt-2 text-right">
              <a href="#" className="text-orange-500 text-sm">
                Forgot password?
              </a>
            </div>

            <button className="mt-4 w-full rounded-lg bg-orange-500 p-3 text-white font-bold hover:bg-orange-600">
              Login
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <span className="w-full border-t border-gray-300"></span>
            <span className="mx-3 text-gray-500">Or Login with</span>
            <span className="w-full border-t border-gray-300"></span>
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
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-500">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
