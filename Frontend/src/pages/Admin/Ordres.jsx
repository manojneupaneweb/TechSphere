import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
useEffect(() => {
  const fetchOrders = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("/api/v1/product/vieworder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response.data.message);
      setOrders(response.data.message || []); // adjust according to your API
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }

    setLoading(false);
  };

  fetchOrders();
}, []);


  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    // Optionally, send status update to backend here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg font-semibold">Loading orders...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Sn</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Total</th>
              <th className="p-3">Product(s)</th>
              <th className="p-3">Total Product</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order._id || index} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{order.id || order._id || "-"}</td>
                  <td className="p-3">{order.customer || order.customerName || "-"}</td>
                  <td className="p-3">{order.total || "-"}</td>
                  <td className="p-3">
                    {Array.isArray(order.products)
                      ? order.products.map((p) => p.name).join(", ")
                      : order.product || "-"}
                  </td>
                  <td className="p-3">
                    {order.totalProduct ||
                      (Array.isArray(order.products) ? order.products.length : "-")}
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className="px-2 py-1 border rounded text-sm bg-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
