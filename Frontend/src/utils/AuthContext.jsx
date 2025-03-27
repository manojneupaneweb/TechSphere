import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const AdminAccess = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/v1/user/getprofile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Ensure data.message exists before accessing role
        if (data?.message?.role === "admin" || data?.message?.role === "administrative") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAdmin(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  if (isAdmin === null) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loading />
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/login" />;
};

const UserAccess = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? children : <Navigate to="/login" />;
};

const Logout = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      await axios.get("/api/v1/user/logout", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
};

export { AdminAccess, UserAccess, Logout };
