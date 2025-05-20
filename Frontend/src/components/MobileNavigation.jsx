import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const MobileNavigation = ({ isOpen, onClose, isLoggedIn, isAdmin, userData, handleLogout }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    {
      name: "Laptops",
      subcategories: [
        { name: "HP", link: "/category/laptops/hp" },
        { name: "Lenovo", link: "/category/laptops/lenovo" },
        { name: "Apple (MacBooks)", link: "/category/laptops/apple" },
        { name: "Dell", link: "/category/laptops/dell" },
        { name: "Asus", link: "/category/laptops/asus" },
        { name: "Acer", link: "/category/laptops/acer" },
        { name: "MSI", link: "/category/laptops/msi" }
      ]

    },
    {
      name: "Smartphones",
      subcategories: [
        { name: "Apple iPhones", link: "/category/smartphones/apple" },
        { name: "Samsung Galaxy", link: "/category/smartphones/samsung" },
        { name: "Google Pixel", link: "/category/smartphones/google" },
        { name: "Xiaomi", link: "/category/smartphones/xiaomi" },
        { name: "OnePlus", link: "/category/smartphones/oneplus" },
        { name: "Budget Phones", link: "/category/smartphones/budget" }
      ]
    },
    {
      name: "Accessories",
      subcategories: [
        { name: "Headphones", link: "/category/accessories/headphones" },
        { name: "Cases & Covers", link: "/category/accessories/cases" },
        { name: "Chargers & Cables", link: "/category/accessories/chargers" },
        { name: "Storage Devices", link: "/category/accessories/storage" },
        { name: "Keyboards & Mice", link: "/category/accessories/keyboards" },
        { name: "Speakers", link: "/category/accessories/speakers" }
      ]
    },
    {
      name: "Gaming",
      subcategories: [
        { name: "Gaming Consoles", link: "/category/gaming/consoles" },
        { name: "Controllers", link: "/category/gaming/controllers" },
        { name: "Gaming Headsets", link: "/category/gaming/headsets" },
        { name: "Gaming Chairs", link: "/category/gaming/chairs" },
        { name: "Gaming Accessories", link: "/category/gaming/accessories" },
        { name: "Virtual Reality", link: "/category/gaming/vr" }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60">
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="text-xl font-bold text-[#8a0106]" onClick={onClose}>
            TechHub
          </Link>
          <button onClick={onClose} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="h-[calc(100vh-5rem)] overflow-y-auto p-4 pb-24">
          <nav className="space-y-2">
            {/* Account Section */}
            <div className="mb-4 pb-4 border-b">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-3">
                  <div className="px-3 py-2 font-medium">Hi, {userData?.name || 'User'}!</div>
                  <Link
                    to="/account"
                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <span>My Account</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                      onClick={onClose}
                    >
                      <span>Admin Dashboard</span>
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    </Link>
                  )}
                  <button
                    className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 text-left"
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                  >
                    <span>Logout</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/auth/login"
                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <span className="font-medium">Sign In</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <span className="font-medium">Create Account</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-1">
              {categories.map((category) => (
                <div key={category.name} className="mb-1">
                  <button
                    className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100"
                    onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                  >
                    <span className="font-medium">{category.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 opacity-60 transition-transform ${openCategory === category.name ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openCategory === category.name && (
                    <div className="ml-4 mt-1 space-y-1 border-l pl-3">
                      {category.subcategories.map((subcat) => (
                        <Link
                          key={subcat.name}
                          to={subcat.link}
                          className="block py-2 px-3 rounded-md hover:bg-gray-100"
                          onClick={onClose}
                        >
                          {subcat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Deals - No dropdown */}
              <div className="mb-1">
                <Link
                  to="/deals"
                  className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span className="font-medium">Deals</span>
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </Link>
              </div>
            </div>

            {/* Additional Links */}
            <div className="mt-6 pt-6 border-t">
              <div className="space-y-1">
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span>Wishlist</span>
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span>Cart</span>
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span>Blog</span>
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </Link>
                <Link
                  to="/about"
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span>About Us</span>
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <span>Contact</span>
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;