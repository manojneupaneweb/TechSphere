import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("token not found");
        setRedirect(true);
        return;
      }else{
        
      }
      try {
        const response = await axios.get("/api/v1/user/getprofile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data.message);
        console.log(response);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setRedirect(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (redirect) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen py-12 flex justify-center items-center">
      {loading ? (
        <div className="h-[60vh] flex justify-center items-center">
          Loading 
        </div>
      ) : user ? (
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg transition-all duration-300 transform ">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={user.profilePicture || '/default-avatar.jpg'}
              alt="Profile"
              className="w-52 h-52 rounded-full border border-blue-600 shadow-lg mb-4 cursor-pointer transition-transform transform "
              onClick={() => alert('You can change your profile picture here!')}
            />
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{user.fullName}</h2>
            <p className="text-gray-500 text-sm mb-4">{user.email}</p>

            {/* Edit Button */}
            <div className="flex gap-4">
              <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200">
                Edit Profile
              </button>
              <button className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-200">
                Change Password
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="text-gray-800">{user.phone || 'Not Provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Role:</span>
              <span className="text-gray-800">{user.role}</span>
            </div>
            {user.bio && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Bio:</span>
                <span className="text-gray-800">{user.bio}</span>
              </div>
            )}
            {user.address && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-gray-800">{user.address}</span>
              </div>
            )}
          </div>

          {/* Social Media Links */}
          {user.socialLinks && (
            <div className="mt-6 flex justify-center gap-6">
              {user.socialLinks.github && (
                <a
                  href={user.socialLinks.github}
                  className="text-gray-800 hover:text-indigo-600 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github text-2xl" />
                </a>
              )}
              {user.socialLinks.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  className="text-gray-800 hover:text-indigo-600 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin text-2xl" />
                </a>
              )}
              {user.socialLinks.twitter && (
                <a
                  href={user.socialLinks.twitter}
                  className="text-gray-800 hover:text-indigo-600 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter text-2xl" />
                </a>
              )}
            </div>
          )}

          {/* Activity History Tab */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
            <ul className="space-y-2 text-gray-600">
              {user.recentActivity?.map((activity, index) => (
                <li key={index} className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Failed to load profile.</p>
      )}
    </div>
  );
}

export default Profile;
