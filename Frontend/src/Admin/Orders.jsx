import React from 'react';

const Orders = () => {
  const orders = [
    { id: 1, customer: 'John Doe', status: 'Pending', total: '$399' },
    { id: 2, customer: 'Jane Smith', status: 'Shipped', total: '$899' },
    { id: 3, customer: 'Mike Johnson', status: 'Delivered', total: '$199' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg overflow-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.customer}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">{order.total}</td>
              <td className="px-4 py-2">
                <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                  View
                </button>
                <button className="ml-2 px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700">
                  Update Status
                </button>
                <button className="ml-2 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
