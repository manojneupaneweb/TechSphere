import React, { useState } from "react";
import { Menu, Search, Bell, Moon, User } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);

    return (
        <div className={`${darkMode ? "dark" : ""} flex h-screen overflow-hidden`}>
            {/* Sidebar */}
            <aside className={`bg-gray-900 text-white p-5 w-64 transition-all ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-4">
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
                        <Link key={link} to={`/admin/${link.toLowerCase().replace(/ /g, "-")}`} className="block px-3 py-2 rounded hover:bg-gray-700">
                            {link}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Section */}
            <div className="flex flex-col flex-1 overflow-hidden">
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
                                <User className="w-8 h-8 text-gray-700 dark:text-white rounded-full border p-1" />
                            </button>
                            {profileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg overflow-hidden">
                                    {[
                                        "Profile",
                                        "Settings",
                                        "Logout",
                                    ].map((item) => (
                                        <button key={item} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
