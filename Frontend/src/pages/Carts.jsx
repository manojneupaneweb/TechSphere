import React, { useState } from 'react';

const Carts = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  // Function to handle the remove action
  const handleRemoveItem = (itemId) => {
    setItemToRemove(itemId);
    setIsPopupOpen(true);
  };

  // Function to confirm removal
  const confirmRemove = () => {
    // Logic to remove the item from cart (e.g., update cart state)
    console.log(`Item ${itemToRemove} removed from cart.`);
    setIsPopupOpen(false);
  };

  // Function to cancel removal
  const cancelRemove = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-auto bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Shopping Cart</h1>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cart Items</h2>
        
        <div className="space-y-4">
          {/* Cart Item Example */}
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center space-x-4">
              <img src="https://via.placeholder.com/100" alt="Product" className="w-24 h-24 object-cover rounded" />
              <div>
                <h3 className="font-semibold">Product Name</h3>
                <p className="text-gray-500">Short description of the product.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">$29.99</p>
              <button
                onClick={() => handleRemoveItem(1)}  // Pass the item's id (1 in this case)
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
              
            </div>
          </div>

          {/* Add more items here */}
        </div>

        {/* Cart Total */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-700">Total:</p>
          <p className="text-xl font-bold text-gray-900">$29.99</p>
        </div>

        {/* Checkout Button */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center mb-4">Are you sure you want to remove this item?</h2>
            <div className="flex justify-between">
              <button
                onClick={confirmRemove}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Remove
              </button>
              <button
                onClick={cancelRemove}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
