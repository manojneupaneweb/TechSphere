import React from "react";

const Orders = () => {
  const orders = [
    { id: "#001", customer: "John Doe", status: "Pending", total: "$120.00" },
    { id: "#002", customer: "Jane Smith", status: "Completed", total: "$200.00" },
    { id: "#003", customer: "Alice Johnson", status: "Shipped", total: "$95.00" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      order.status === "Completed"
                        ? "bg-green-200 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-200 text-blue-700"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.total}</td>
                <td className="p-3">
                  <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                    View
                  </button>
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
