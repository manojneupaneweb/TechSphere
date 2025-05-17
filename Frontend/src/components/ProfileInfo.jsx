import React from 'react'

function ProfileInfo() {
    const [user, setUser] = useState(null);
      const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
      });
      const [activeTab, setActiveTab] = useState('profile');
      const [editingProfile, setEditingProfile] = useState(false);
    
      useEffect(() => {
        const fetchUserProfile = async () => {
          const token = localStorage.getItem('accessToken');
          if (!token) return;
          try {
            const { data } = await axios.get('/api/v1/user/getprofile', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(data.message);
            setProfileData({
              name: data.message.name || '',
              email: data.message.email || '',
              phone: data.message.phone || '',
            });
          } catch (error) {
            console.error('Error fetching profile data', error);
          }
        };
        fetchUserProfile();
      }, []);
    
  return (
    <div>
        <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center">
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold">{user.name}</h2>
                  <p className="text-sm text-gray-500">Member since {user.memberSince}</p>
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
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </button>
                </div>
              )}
            </div>
          </div>
    </div>
  )
}

export default ProfileInfo