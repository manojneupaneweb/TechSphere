import React, { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: "#001",
      customer: "John Doe",
      total: "$120.00",
      product: "Laptop",
      totalProduct: 1,
      status: "Pending",
    },
    {
      id: "#002",
      customer: "Jane Smith",
      total: "$200.00",
      product: "Smartphone, Case, Earphone, Charger",
      totalProduct: 4,
      status: "Completed",
    },
    {
      id: "#003",
      customer: "Alice Johnson",
      total: "$95.00",
      product: "Headphones",
      totalProduct: 3,
      status: "Shipped",
    },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Sn</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Total</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Total Product</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.total}</td>
                <td className="p-3">{order.product}</td>
                <td className="p-3">{order.totalProduct}</td>
                <td className="p-3">
                  <select
                    value={order.status}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
