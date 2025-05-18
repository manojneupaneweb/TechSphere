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

  const location = useLocation();

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
        { title: "Delete", href: "/admin/delete-products" },
      ],
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <Package className="h-5 w-5" />,
      subItems: [
        { title: "All Orders", href: "/admin/orders" },
        // { title: "Pending Orders", href: "/admin/pending-order" },
        
      ],
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      subItems: [
        { title: "General", href: "/admin/settings/general" },
        { title: "Users & Permissions", href: "/admin/settings/users" },
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:shadow-none
        `}
        style={{ minWidth: "16rem" }}
      >
        <div className="flex justify-center items-center py-6">
          <a href="/admin/dashboard">
            <img src={Logo} alt="Logo" className="w-40 h-14" />
          </a>
        </div>
        <nav className="space-y-2 px-2">
          {navItems.map((item) => (
            <div key={item.title}>
              <div>
                {item.subItems ? (
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`flex items-center gap-3 px-3 py-2 rounded w-full text-left transition
                      ${openSubmenu === item.title || activeLink === item.title
                        ? "bg-[#8a0106] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                    <span
                      className={`ml-auto transition-transform ${openSubmenu === item.title ? "rotate-90" : ""
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
                    className={`flex items-center gap-3 px-3 py-2 rounded transition
                      ${activeLink === item.title ? "text-gray-700 hover:bg-gray-100 " : "text-gray-700 hover:bg-gray-100"}
                    `}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
              {/* Submenu */}
              {item.subItems && openSubmenu === item.title && (
                <div className="pl-7 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      onClick={() => {
                        setActiveLink(subItem.title);
                        handleNavClick();
                      }}
                      className={`block px-3 py-2 rounded transition
                        ${activeLink === subItem.title
                          ? "bg-[#8a0106] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity md:hidden ${isSidebarOpen ? "block" : "hidden"
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white p-4 flex items-center justify-between shadow-md sticky top-0 z-20">
          <button
            className="sidebar-toggle-btn md:hidden mr-2"
            onClick={handleSidebarToggle}
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1 flex items-center">
            {/* <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-3 py-2 bg-gray-100 rounded-md focus:ring w-full max-w-xs"
            /> */}
          </div>
          <div className="flex items-center space-x-4 ml-4">
            {/* User Account Dropdown */}
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
              >
                {userData?.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="User"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-700" />
                  </div>
                )}
                <span className="ml-2 hidden sm:block font-medium">
                  {userData?.fullName}
                </span>
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform ${isUserMenuOpen ? "rotate-180" : ""
                    }`}
                />
              </div>
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to="/admin/settings/general"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={Logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* Main Content Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;