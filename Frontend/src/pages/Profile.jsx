import React, { useEffect, useState } from 'react';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  LogOut,
  Edit,
  Plus,
  Trash2,
  Eye,
  Download,
  Calendar,
  Clock,
} from 'lucide-react';
import axios from 'axios';


function Profile() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const { data } = await axios.get("/api/v1/user/getprofile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.message);
        console.log("Profile data:", data.message.id);
        
        
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchUserProfile();
  }, []);





  const [activeTab, setActiveTab] = useState("profile");
  const [editingProfile, setEditingProfile] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };


  const saveProfileChanges = () => {
    console.log("Saving profile changes:", profileData);
    setEditingProfile(false);
  };

  const getStatusColor = () => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-2 mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500">
            <a href="/" className="hover:text-[#8a0106]">Home</a>
            <span className="mx-2">/</span>
            <span>My Account</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full overflow-hidden cursor-pointer">
                  {/* <img src={user.profilePicture}  className="h-full w-full object-cover" /> */}
                </div>
                <div>
                  {/* <h2 className="font-bold">{user.fullName}</h2> */}
                  {/* <p className="text-sm text-gray-500">Member since {user.memberSince}</p> */}
                </div>
              </div>

              <hr className="mb-6" />

              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === "profile"
                      ? "bg-[#8a0106] text-white"
                      : "text-gray-900 hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === "orders"
                      ? "bg-[#8a0106] text-white"
                      : "text-gray-900 hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === "addresses"
                      ? "bg-[#8a0106] text-white"
                      : "text-gray-900 hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab("addresses")}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Addresses
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === "payment"
                      ? "bg-[#8a0106] text-white"
                      : "text-gray-900 hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab("payment")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === "wishlist"
                      ? "bg-[#8a0106] text-white"
                      : "text-gray-900 hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === "settings"
                      ? "bg-[#8a0106] text-white"
                      : "text-gray-900 hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </button>
                <hr className="my-2" />
                <button
                  className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Tabs - Mobile */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "profile"
                      ? "bg-[#8a0106] text-white"
                      : "bg-gray-100 text-gray-900"
                    }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "orders"
                      ? "bg-[#8a0106] text-white"
                      : "bg-gray-100 text-gray-900"
                    }`}
                  onClick={() => setActiveTab("orders")}
                >
                  Orders
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "more"
                      ? "bg-[#8a0106] text-white"
                      : "bg-gray-100 text-gray-900"
                    }`}
                  onClick={() => setActiveTab("more")}
                >
                  More
                </button>
              </div>

              {activeTab === "more" && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 flex justify-between items-center border-b">
                  <h2 className="text-xl font-bold">Profile Information</h2>
                  <button
                    className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50"
                    onClick={() => setEditingProfile(!editingProfile)}
                  >
                    {editingProfile ? (
                      "Cancel"
                    ) : (
                      <>
                        <Edit className="h-4 w-4 inline mr-2" />
                        Edit
                      </>
                    )}
                  </button>
                </div>

                <div className="p-6">
                  {editingProfile ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring focus:ring-[#8a0106] focus:ring-opacity-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring focus:ring-[#8a0106] focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring focus:ring-[#8a0106] focus:ring-opacity-50"
                        />
                      </div>
                      <div className="pt-4">
                        <button
                          className="px-4 py-2 bg-[#8a0106] text-white rounded-md hover:bg-[#6d0105]"
                          onClick={saveProfileChanges}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className="h-24 w-24 rounded-full overflow-hidden mr-6">
                          <img
                            // src={user.profilePicture}
                            // alt={user.fullName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          {/* <h3 className="text-xl font-bold mb-1">{user.fullName}</h3> */}
                          <p className="text-gray-500">Member since {user.memberSince}</p>
                          <button className="text-[#8a0106] hover:text-[#6d0105] mt-2">
                            Change profile picture
                          </button>
                        </div>
                      </div>

                      <hr />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p>{user.phone}</p>
                        </div>
                      </div>

                      <hr />

                      <div>
                        <h3 className="font-medium mb-2">Account Security</h3>
                        <div className="space-x-2">
                          <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
                            Change Password
                          </button>
                          <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
                            Enable Two-Factor Authentication
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Order History</h2>
                  <p className="text-gray-500">View and track your orders</p>
                </div>

                <div className="p-6">
                  {user.orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <a
                        href="/"
                        className="inline-block px-4 py-2 bg-[#8a0106] text-white rounded-md hover:bg-[#6d0105]"
                      >
                        Start Shopping
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {user.orders.map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="space-y-1">
                                <h3 className="font-medium">Order #{order.id}</h3>
                                <p className="text-sm text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(order.date).toLocaleDateString()}
                                  <span className="mx-2">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  {new Date(order.date).toLocaleTimeString()}
                                </p>
                              </div>
                              <div className="flex items-center mt-2 md:mt-0">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                                <button className="ml-2 text-gray-500 hover:text-gray-700">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="space-y-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center">
                                  <div className="h-16 w-16 bg-gray-100 rounded-md flex-shrink-0 mr-4">
                                    <img
                                      src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=64&h=64&fit=crop"
                                      alt={item.name}
                                      className="h-full w-full object-contain p-2"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">${item.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 flex justify-between">
                            <div>
                              <span className="text-sm text-gray-500 mr-2">Total:</span>
                              <span className="font-bold">${order.total.toFixed(2)}</span>
                            </div>
                            <div className="space-x-2">
                              <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100">
                                <Download className="h-4 w-4 inline mr-1" />
                                Invoice
                              </button>
                              {order.status === "Delivered" && (
                                <button className="px-4 py-2 text-sm font-medium rounded-md bg-[#8a0106] text-white hover:bg-[#6d0105]">
                                  Buy Again
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 flex justify-between items-center border-b">
                  <div>
                    <h2 className="text-xl font-bold">Saved Addresses</h2>
                    <p className="text-gray-500">Manage your shipping addresses</p>
                  </div>
                  <button className="px-4 py-2 bg-[#8a0106] text-white rounded-md hover:bg-[#6d0105]">
                    <Plus className="h-4 w-4 inline mr-2" />
                    Add Address
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 ${address.default ? "border-[#8a0106]" : ""
                          }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{address.name}</h3>
                          {address.default && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full border border-[#8a0106] text-[#8a0106]">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm space-y-1 mb-4">
                          <p>{address.line1}</p>
                          {address.line2 && <p>{address.line2}</p>}
                          <p>
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p>{address.country}</p>
                          <p className="mt-2">{address.phone}</p>
                        </div>
                        <div className="flex justify-between">
                          <button className="text-gray-500 hover:text-gray-700">
                            <Edit className="h-4 w-4 inline mr-1" />
                            Edit
                          </button>
                          {!address.default && (
                            <>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4 inline mr-1" />
                                Remove
                              </button>
                              <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
                                Set as Default
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === "payment" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 flex justify-between items-center border-b">
                  <div>
                    <h2 className="text-xl font-bold">Payment Methods</h2>
                    <p className="text-gray-500">Manage your payment methods</p>
                  </div>
                  <button className="px-4 py-2 bg-[#8a0106] text-white rounded-md hover:bg-[#6d0105]">
                    <Plus className="h-4 w-4 inline mr-2" />
                    Add Payment Method
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 ${method.default ? "border-[#8a0106]" : ""
                          }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center mr-2">
                              <img
                                src="https://images.unsplash.com/photo-1580508174046-170816f65662?w=36&h=24&fit=crop"
                                alt={method.type}
                                className="object-contain"
                              />
                            </div>
                            <h3 className="font-medium">
                              {method.type} ending in {method.last4}
                            </h3>
                          </div>
                          {method.default && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full border border-[#8a0106] text-[#8a0106]">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm space-y-1 mb-4">
                          <p>Expires: {method.expiry}</p>
                          <p>Card holder: {method.name}</p>
                        </div>
                        <div className="flex justify-between">
                          <button className="text-gray-500 hover:text-gray-700">
                            <Edit className="h-4 w-4 inline mr-1" />
                            Edit
                          </button>
                          {!method.default && (
                            <>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4 inline mr-1" />
                                Remove
                              </button>
                              <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
                                Set as Default
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">My Wishlist</h2>
                  <p className="text-gray-500">Items you've saved for later</p>
                </div>

                <div className="p-6">
                  {user.wishlist.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-500 mb-4">Save items you like for future reference.</p>
                      <a
                        href="/"
                        className="inline-block px-4 py-2 bg-[#8a0106] text-white rounded-md hover:bg-[#6d0105]"
                      >
                        Start Shopping
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.wishlist.map((item) => (
                        <div key={item.id} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                          <div className="h-20 w-20 bg-gray-100 rounded-md flex-shr
ink-0 mr-4 relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain p-2"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-[#8a0106] font-bold">${item.price.toFixed(2)}</p>
                            <p className={`text-sm ${item.inStock ? "text-green-600" : "text-red-600"}`}>
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <button
                              className={`px-4 py-2 text-sm font-medium rounded-md ${item.inStock
                                  ? "bg-[#8a0106] text-white hover:bg-[#6d0105]"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                              disabled={!item.inStock}
                            >
                              Add to Cart
                            </button>
                            <button className="px-4 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 inline mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Account Settings</h2>
                  <p className="text-gray-500">Manage your account preferences</p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">Order Updates</label>
                            <p className="text-sm text-gray-500">
                              Receive notifications about your orders
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.orderUpdates}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8a0106]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8a0106]"></div>
                          </label>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">Promotions</label>
                            <p className="text-sm text-gray-500">
                              Receive notifications about sales and promotions
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.promotions}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8a0106]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8a0106]"></div>
                          </label>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">New Products</label>
                            <p className="text-sm text-gray-500">
                              Be the first to know about new products
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.newProducts}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8a0106]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8a0106]"></div>
                          </label>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">Newsletter</label>
                            <p className="text-sm text-gray-500">
                              Receive our weekly newsletter
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={user.notifications.newsletter}
                              readOnly
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8a0106]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8a0106]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div>
                      <h3 className="font-medium mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">Data Sharing</label>
                            <p className="text-sm text-gray-500">
                              Allow us to share your data with trusted partners
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8a0106]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8a0106]"></div>
                          </label>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium">Cookies</label>
                            <p className="text-sm text-gray-500">
                              Manage cookie preferences
                            </p>
                          </div>
                          <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div>
                      <h3 className="font-medium mb-4">Account Actions</h3>
                      <div className="space-y-4">
                        <button className="px-4 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50">
                          Deactivate Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;