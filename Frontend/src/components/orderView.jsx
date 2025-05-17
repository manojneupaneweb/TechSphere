import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function OrderView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const { data } = await axios.get("/api/v1/product/vieworder", {
          headers: { Authorization: `Bearer ${token}` },
        });

        
        setOrders(data.message || []);
        console.log("Order data:", data.message);
      } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Failed to fetch orders.");
      }
    };

    fetchUserOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Product Name: </strong> {order.name}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Status:</strong> {order.order_status}</p>
              <p><strong>Payment:</strong> {order.payment_status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderView;
