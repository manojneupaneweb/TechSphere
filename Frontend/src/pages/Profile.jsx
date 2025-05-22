// ProfileInfo.jsx
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import Loading from '../components/Loading';
import axios from 'axios';

const STATUS_ORDER = ['pending', 'shipping', 'complete', 'cancel'];

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get("/api/v1/user/getprofile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.message);
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchOrderData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get("/api/v1/order/getallorder", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(Array.isArray(data.orders) ? data.orders : []);
      } catch (error) {
        console.error("Error fetching order data", error);
        setOrder([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
    fetchOrderData();
  }, []);

  // Sort orders by STATUS_ORDER priority
  const sortedOrders = [...order].sort((a, b) => {
    const aIndex = STATUS_ORDER.indexOf((a.order_status || '').toLowerCase());
    const bIndex = STATUS_ORDER.indexOf((b.order_status || '').toLowerCase());
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No user data found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-36">
      {/* Profile Information Section */}
      <section className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="h-28 w-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-[#8a0106] shadow-md">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-14 w-14 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-[#8a0106] mb-1">{user.fullName}</h2>
          <p className="text-gray-500 mb-2">Member since {user.createdAt}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Email Address</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Phone Number</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order List Section */}
      <section className="bg-white rounded-xl shadow p-6">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h1>
          {sortedOrders.length === 0 && (
            <div className="text-center">
              <p className="text-gray-500">No orders found.</p>
            </div>
          )}

          {sortedOrders.map((item, index) => (
            <div key={item.id || index} className="bg-white rounded-xl shadow-md overflow-hidden mb-6 transition-all hover:shadow-lg">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Order #{index + 1}</h2>
                    <p className="text-sm text-gray-500">Placed on {new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.order_status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : item.order_status === 'shipping'
                      ? 'bg-blue-100 text-blue-800'
                      : item.order_status === 'complete'
                      ? 'bg-green-100 text-green-800'
                      : item.order_status === 'cancel'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.order_status}
                  </span>
                </div>

                {/* Product Details */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product?.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: ₹{item.product?.price?.toLocaleString()}</p>
                    <p className="text-gray-600">Total: ₹{(item.quantity * (item.product?.price || 0)).toLocaleString()}</p>
                  </div>
                </div>

                {/* User Information */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name: {item.user ? item.user.fullname : 'N/A'}</p>
                      <p className="text-sm text-gray-600">Email: {item.user ? item.user.email : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Payment Status:
                        <span className={`ml-2 ${item.payment_status === 'COMPLETE'
                          ? 'text-green-600 font-medium'
                          : 'text-red-600'
                        }`}>
                          {item.payment_status}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Last Updated: {new Date(item.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileInfo;
