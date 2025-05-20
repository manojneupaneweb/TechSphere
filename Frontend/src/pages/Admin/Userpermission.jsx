import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import axios from "axios";

// Simple Toast component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white transition-all ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
      role="alert"
    >
      {message}
    </div>
  );
}

// Confirmation Modal Component
function ConfirmationModal({ isOpen, onClose, onConfirm, user, newRole }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirm Role Change
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to change <span className="font-semibold">{user.fullName}</span>'s role to{" "}
          <span className="font-semibold">{newRole}</span>?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function UserPermission() {
  const [users, setUsers] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("user"); // "user" or "admin"
  const [changingRoleId, setChangingRoleId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    user: null,
    newRole: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const usersResponse = await axios.get("/api/v1/user/getalluser", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profileResponse = await axios.get("/api/v1/user/getprofile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setMyProfile(profileResponse.data.message);
      setUsers(usersResponse.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setToast({ message: "Failed to fetch users.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const showConfirmation = (user) => {
    if (myProfile?.id === user.id) return;
    
    const newRole = user.role === "admin" ? "user" : "admin";
    setConfirmationModal({
      isOpen: true,
      user,
      newRole,
    });
  };

  const handleConfirmChangeRole = async () => {
    const { user, newRole } = confirmationModal;
    setConfirmationModal({ isOpen: false, user: null, newRole: "" });
    
    setChangingRoleId(user.id);
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        "/api/v1/user/changerole",
        { id: user.id, role: newRole },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setToast({
        message: `Role changed successfully for ${user.fullName}.`,
        type: "success",
      });
      fetchUsers();
    } catch (error) {
      setToast({
        message: "Failed to change role.",
        type: "error",
      });
    } finally {
      setChangingRoleId(null);
    }
  };

  const handleCancelChangeRole = () => {
    setConfirmationModal({ isOpen: false, user: null, newRole: "" });
  };

  const filteredUsers = users.filter((user) => user.role === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
      
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={handleCancelChangeRole}
        onConfirm={handleConfirmChangeRole}
        user={confirmationModal.user}
        newRole={confirmationModal.newRole}
      />

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              User Permissions
            </h1>
            <p className="text-gray-600 mt-1">
              Manage user roles and permissions
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === "user"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("user")}
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Users ({users.filter(u => u.role === "user").length})
              </span>
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === "admin"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("admin")}
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                Admins ({users.filter(u => u.role === "admin").length})
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loading />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-700">
                      No {activeTab}s found
                    </h3>
                    <p className="mt-1 text-gray-500">
                      There are currently no {activeTab}s in the system.
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user, index) => (
                        <tr
                          key={user.id}
                          className={`hover:bg-gray-50 transition-colors duration-150 ${
                            myProfile?.id === user.id ? "bg-blue-50" : ""
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                            {myProfile?.id === user.id && (
                              <span className="ml-1 text-xs text-blue-600">(You)</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                {user.profilePicture ? (
                                  <img 
                                    src={user.profilePicture} 
                                    alt="" 
                                    className="h-full w-full rounded-full object-cover"
                                  />
                                ) : (
                                  <span className="text-blue-600 font-medium">
                                    {user.fullName.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.fullName}
                                  {myProfile?.id === user.id && (
                                    <span className="ml-1 text-xs text-blue-600">(You)</span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 sm:hidden">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {user.phone || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => showConfirmation(user)}
                              disabled={changingRoleId === user.id || myProfile?.id === user.id}
                              className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm ${
                                myProfile?.id === user.id
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : user.role === "admin"
                                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                    : "bg-green-500 hover:bg-green-600 text-white"
                              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                user.role === "admin"
                                  ? "focus:ring-yellow-500"
                                  : "focus:ring-green-500"
                              } transition-colors duration-200 ${
                                changingRoleId === user.id ? "opacity-70" : ""
                              }`}
                              title={myProfile?.id === user.id ? "You cannot change your own role" : ""}
                            >
                              {changingRoleId === user.id ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Processing...
                                </>
                              ) : user.role === "admin" ? (
                                "Make User"
                              ) : (
                                "Make Admin"
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPermission;