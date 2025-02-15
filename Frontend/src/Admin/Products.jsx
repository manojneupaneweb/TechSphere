import React from 'react';

const Products = () => {
  const products = [
    { id: 1, name: 'Smartphone', price: '$299', description: 'A powerful smartphone with a great camera.' },
    { id: 2, name: 'Laptop', price: '$799', description: 'High-performance laptop with a sleek design.' },
    { id: 3, name: 'Smartwatch', price: '$199', description: 'Track your fitness with this stylish smartwatch.' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg overflow-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="px-4 py-2">{product.id}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">
                <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                  Edit
                </button>
                <button className="ml-2 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
