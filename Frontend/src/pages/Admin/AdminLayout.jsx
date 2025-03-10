import React, { useEffect, useState } from "react";
import { Menu, Search, Bell, Moon, User } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios"; // ✅ Import Axios
import Logo from "../../assets/image/favicon.png";
import { Logout } from "../../utils/AuthContext";

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // ✅ Defined isAdmin state

    const [data, setData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchUserProfile = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        try {
            const response = await axios.get("/api/v1/user/getprofile", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            setData(response.data.message);
            setIsLoggedIn(true);
            if (response.data.message.role === "admin") {
                setIsAdmin(true);
            }
        } catch (error) {
            console.error("Error fetching Profile data", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        await Logout();
        setIsLoggedIn(false);
        window.location.href = "/login"; // ✅ Redirect to login after logout
    };

    return (
        <div className={`${darkMode ? "dark" : ""} flex h-screen overflow-hidden`}>
            {/* Sidebar */}
            <aside
                className={`bg-gray-900 text-white p-5 w-64 fixed inset-y-0 left-0 transform transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static`}
            >
                <a href="/" className="flex justify-center">
                    <img src={Logo} alt="Logo" className="w-40 h-14" />
                </a>
                <nav className="space-y-4 mt-5">
                    {[
                        "Dashboard",
                        "Add Product",
                        "Orders",
                        "Customers",
                        "Analytics",
                        "Reports",
                        "Marketing",
                        "Settings",
                        "User Management",
                        "Help & Support",
                    ].map((link) => (
                        <Link
                            key={link}
                            to={`/admin/${encodeURIComponent(link.toLowerCase().replace(/ /g, "-"))}`}
                            className="block px-3 py-2 rounded hover:bg-gray-700"
                        >
                            {link}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Section */}
            <div className="flex flex-col flex-1">
                {/* Navbar */}
                <header className="bg-white dark:bg-gray-800 flex justify-between items-center p-4 shadow-md">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
                        </button>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring w-64"
                            />
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-4">
                        <button onClick={() => setDarkMode(!darkMode)}>
                            <Moon className="w-6 h-6 text-gray-700 dark:text-white" />
                        </button>
                        <button>
                            <Bell className="w-6 h-6 text-gray-700 dark:text-white" />
                        </button>
                        <div className="relative">
                            <button onClick={() => setProfileMenu(!profileMenu)}>
                                {data ? (
                                    <img
                                        src={data?.profilePicture || "/default-profile.png"} // ✅ Fallback image
                                        className="w-8 h-8 rounded-full border p-1"
                                        alt="User"
                                    />
                                ) : (
                                    <User className="w-8 h-8 text-gray-700 dark:text-white rounded-full border p-1" />
                                )}
                            </button>
                            {profileMenu && (
                                <div onClick={() => setProfileMenu(false)}
                                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg overflow-hidden">
                                    <Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                                        Profile
                                    </Link>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-100 overflow-y-scroll">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
