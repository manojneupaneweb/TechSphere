import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, Users, Layers, BarChart3, Percent, FileText, Truck, CreditCard, Globe, MessageSquare, Settings, HelpCircle } from "lucide-react"; // Import your icons
import Logo from "../../assets/image/favicon.png"; // Logo image
import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("Dashboard"); // Track the active link
  const [openSubmenu, setOpenSubmenu] = useState(null);


  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
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
      title: "Inventory",
      href: "/admin/inventory",
      icon: <Layers className="h-5 w-5" />,
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
      title: "Payments",
      href: "/admin/payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Integrations",
      href: "/admin/integrations",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "Support",
      href: "/admin/support",
      icon: <MessageSquare className="h-5 w-5" />,
      subItems: [
        { title: "Tickets", href: "/admin/support/tickets" },
        { title: "Live Chat", href: "/admin/support/chat" },
        { title: "FAQ Management", href: "/admin/support/faq" },
      ],
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
                        className={`ml-auto transition-transform transform ${
                          openSubmenu === item.title ? "rotate-90" : ""
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