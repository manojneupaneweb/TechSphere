import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const AdminAccess = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // Check if user is an admin
  const [isAdmin, setIsAdmin] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return null;
      }
      try {
        const response = await axios.get("/api/v1/user/getprofile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        if (response.data.message.role === "admin" || response.data.role === "administrative") {
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
    return <div className="flex  items-center justify-center h-[80vh]">
    {<Loading/>}
    </div>;
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

const Logout = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken")
    const response = await axios.get("/api/v1/user/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
export { AdminAccess, UserAccess, Logout };
