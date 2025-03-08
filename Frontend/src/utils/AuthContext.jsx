import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminAccess = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // Check if user is an admin
  const [isAdmin, setIsAdmin] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        if (response.data.role === "admin" || response.data.role === "administrative") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsAdmin(false);
      }
    };
    fetchProfile();
  }, []);

  if (isAdmin === null) {
    return <p>Loading...</p>;
  }

  return isAdmin ? children : <Navigate to="/login" />;
};

const UserAccess = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export { AdminAccess, UserAccess };
