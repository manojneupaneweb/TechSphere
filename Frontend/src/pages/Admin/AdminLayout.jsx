import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Percent,
  FileText,
  Truck,
  Settings,
  HelpCircle,
  User,
  ChevronDown,
  Menu,
  ChevronRight,
  Search,
} from "lucide-react";
import Logo from "../../assets/image/favicon.png";
import axios from "axios";
import { Logout } from "../../utils/AuthContext";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [userData, setUserData] = useState();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handelProfile = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get("/api/v1/user/getprofile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(data.message);
      } catch (err) {
        // handle error
      }
    };
    handelProfile();
  }, []);

  useEffect(() => {
    // Set active link based on current path
    const found = navItems.find(
      (item) =>
        item.href === location.pathname ||
        (item.subItems &&
          item.subItems.some((sub) => sub.href === location.pathname))
    );
    if (found) {
      setActiveLink(
        found.subItems
          ? found.subItems.find((sub) => sub.href === location.pathname)?.title ||
          found.title
          : found.title
      );
      if (found.subItems) setOpenSubmenu(found.title);
    }
  }, [location.pathname]);

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <ShoppingBag className="h-5 w-5" />,
      subItems: [
        { title: "All Products", href: "/admin/all-product" },
        { title: "Add New", href: "/admin/add-product" },
        { title: "Categories", href: "/admin/add-category" },
      ],
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <Package className="h-5 w-5" />,
      subItems: [
        { title: "Orders", href: "/admin/orders" },
        { title: "Shipped Orders", href: "/admin/orders/shipped" },
        { title: "Complete Orders", href: "/admin/orders/complete" },
        { title: "Cancel Orders", href: "/admin/orders/cancel" },
      ],
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Stocks",
      href: "/admin/stocks",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Analysis",
      href: "/admin/analysis",
      icon: <Percent className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      subItems: [
        { title: "General", href: "/admin/settings/general" },
        { title: "Users & Permissions", href: "/admin/settings/userpermission" },
      ],
    },
    {
      title: "Help",
      href: "/admin/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar on nav click (mobile)
  const handleNavClick = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    if (!isSidebarOpen) return;
    const handleClick = (e) => {
      if (
        !e.target.closest(".admin-sidebar") &&
        !e.target.closest(".sidebar-toggle-btn")
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed z-40 top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl transition-all duration-300 ease-in-out transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static
        `}
        style={{ minWidth: "16rem" }}
      >
        <div className="flex justify-center items-center py-6 px-4 border-b border-gray-700">
          <a href="/admin/dashboard" className="group">
            <img
              src={Logo}
              alt="Logo"
              className="w-40 h-14 transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <div key={item.title} className="relative">
              <div>
                {item.subItems ? (
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all duration-200
                      ${openSubmenu === item.title || activeLink === item.title
                        ? "bg-[#8a0106] text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md"
                      }`}
                  >
                    <span className={`transition-all duration-200 ${openSubmenu === item.title || activeLink === item.title ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                    <span
                      className={`ml-auto transition-transform duration-200 ${openSubmenu === item.title ? "rotate-90" : ""
                        }`}
                    >
                      {<ChevronRight className="w-4 h-4 text-gray-400" />}
                    </span>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => {
                      setActiveLink(item.title);
                      handleNavClick();
                    }}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${activeLink === item.title
                        ? "bg-[#8a0106] text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md"
                      }`}
                  >
                    <span className={`transition-all duration-200 ${activeLink === item.title ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                    {!item.subItems && (
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </Link>
                )}
              </div>
              {/* Submenu */}
              {item.subItems && openSubmenu === item.title && (
                <div className="pl-2 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      onClick={() => {
                        setActiveLink(subItem.title);
                        handleNavClick();
                      }}
                      className={`block px-4 py-2.5 rounded-lg transition-all duration-200
                        ${activeLink === subItem.title
                          ? "bg-[#8a0106] text-white shadow-md"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-gray-500 mr-3"></span>
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {userData?.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-300" />
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{userData?.fullName}</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
            <button
              onClick={Logout}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 md:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className={`bg-white p-4 flex items-center justify-between sticky top-0 z-20 transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
          <button
            className="sidebar-toggle-btn md:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            onClick={handleSidebarToggle}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex-1 flex items-center justify-end md:justify-between">
            {/* Search Bar */}
            <div className="hidden md:block relative w-full max-w-md ml-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8a0106] focus:bg-white w-full transition-all duration-200"
              />
            </div>

            {/* Time, Date, and Location */}
            <div className="hidden md:flex flex-col items-end text-right mr-4 text-gray-600">
              <p className="text-sm font-medium">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-xs">
                {new Date().toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p className="text-xs italic text-gray-400">Kathmandu, Nepal</p>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4 ml-4">
              {/* Notifications */}
              <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {/* User Account Dropdown */}
              <div className="relative">
                <div className="flex items-center cursor-pointer group" onClick={() => setIsUserMenuOpen((prev) => !prev)}>
                  {userData?.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="User"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-300 group-hover:ring-[#8a0106] transition-all duration-200"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-gray-300 group-hover:ring-[#8a0106] transition-all duration-200">
                      <User className="h-5 w-5 text-gray-700" />
                    </div>
                  )}
                  <div className="ml-2 hidden md:block">
                    <p className="text-sm font-medium text-gray-800">{userData?.fullName}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 ml-1 transition-transform duration-200 text-gray-500 ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-200 animate-fade-in"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <Link
                      to="/admin/settings/general"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </div>
                    </Link>
                    <button
                      onClick={Logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>


      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;