import React from 'react';

const Laptops = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Laptops</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Example Laptop Card */}
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <img src="https://via.placeholder.com/300" alt="Laptop" className="w-full h-48 object-cover mb-4 rounded" />
          <h2 className="text-xl font-semibold mb-2">Laptop Model 1</h2>
          <p className="text-gray-500 mb-2">Powerful laptop for all your needs.</p>
          <p className="text-gray-900 font-bold mb-4">$999.99</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Add to Cart</button>
        </div>

        {/* Additional laptop cards can be added here */}
      </div>
    </div>
  );
};

export default Laptops;
