import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, Users, Layers, BarChart3, Percent, FileText, Truck, CreditCard, Globe, MessageSquare, Settings, HelpCircle, User, ChevronDown, Heart } from "lucide-react"; // Import your icons
import Logo from "../../assets/image/favicon.png"; // Logo image
import { Menu } from "lucide-react";
import axios from "axios";
import { Logout } from "../../utils/AuthContext";
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [userData, setUserData] = useState();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const date = Date.now
  useEffect(() => {
    const handelProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get("/api/v1/user/getprofile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(data.message);
      console.log("data", data);

    }


    handelProfile();
  }, []);




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
        { title: "Abandoned Carts", href: "/admin/orders/abandoned" },
        { title: "Returns", href: "/admin/orders/returns" },
      ],
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      subItems: [
        { title: "Sales Reports", href: "/admin/analytics/sales" },
        { title: "Traffic", href: "/admin/analytics/traffic" },
        { title: "Customer Insights", href: "/admin/analytics/customers" },
      ],
    },
    {
      title: "Marketing",
      href: "/admin/marketing",
      icon: <Percent className="h-5 w-5" />,
      subItems: [
        { title: "Promotions", href: "/admin/marketing/promotions" },
        { title: "Coupons", href: "/admin/marketing/coupons" },
        { title: "Email Campaigns", href: "/admin/marketing/email" },
      ],
    },
    {
      title: "Content",
      href: "/admin/content",
      icon: <FileText className="h-5 w-5" />,
      subItems: [
        { title: "Pages", href: "/admin/content/pages" },
        { title: "Blog", href: "/admin/content/blog" },
        { title: "Banners", href: "/admin/content/banners" },
      ],
    },
    {
      title: "Shipping",
      href: "/admin/shipping",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
      subItems: [
        { title: "General", href: "/admin/settings/general" },
        { title: "Users & Permissions", href: "/admin/settings/users" },
        { title: "Store Details", href: "/admin/settings/store" },
        { title: "Taxes", href: "/admin/settings/taxes" },
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-white-900 text-white p-5 w-64 fixed inset-y-0 left-0 transform transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="flex justify-center">
          <a href="/admin/dashboard">
            <img src={Logo} alt="Logo" className="w-40 h-14" />
          </a>
        </div>
        <nav className="space-y-4 mt-5">
          {navItems.map((item) => (
            <div key={item.title}>
              {/* Main Link */}
              <div>
                {item.subItems ? (
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`block px-3 py-2 rounded w-full text-left ${activeLink === item.title ? "bg-[#8a0106] text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                      <span
                        className={`ml-auto transition-transform transform ${openSubmenu === item.title ? "rotate-90" : ""
                          }`}
                      >
                        {">"}
                      </span>
                    </div>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setActiveLink(item.title)}
                    className={`block px-3 py-2 rounded ${activeLink === item.title ? "bg-[#8a0106] text-white" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  </Link>
                )}
              </div>

              {/* Submenu */}
              {item.subItems && openSubmenu === item.title && (
                <div className="pl-4 mt-2 transition-all duration-1000 ease-in-out">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      onClick={() => setActiveLink(subItem.title)}
                      className={`block px-3 py-2 rounded ${activeLink === subItem.title ? "bg-[#8a0106] text-white" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto ">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
          <button
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring w-64"
          />


          <div className="flex items-center space-x-4">
            {/* User Account Dropdown */}
            <div className="hidden sm:flex items-center relative user-menu-container">
              <div
                className="flex flex-col items-center space-x-1 cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                {userData?.profilePicture ? (
                  <img
                    src={userData.profilePicture}
                    alt="User"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-700" />
                  </div>
                )}
                <span className="ml-1  hidden lg:inline ">
                  <span className="flex">

                   {userData?.fullName}
                <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </span>
                </span>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/admin/settings/general"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Setting
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

            <button
              className="md:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>


        </header>

        {/* Main Content Section */}
        <div className="mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;