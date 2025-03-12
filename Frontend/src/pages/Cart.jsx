import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartRemove, updateCartItemQuantity } from '../utils/Cart.utils.js';

function Cart() {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

    const updateQuantity = (itemId, change) => {
        try {
            const updatedCart = updateCartItemQuantity(itemId, change);

            setCart(updatedCart);

            toast.success(`Quantity updated to ${updatedCart.find(item => item.id === itemId).quantity}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (error) {
            toast.error('Error updating quantity!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error(error);
        }
    };

    const removeItem = (item) => {
        try {
            // Remove item from localStorage
            CartRemove(item);

            // Update the cart state
            setCart(prevCart => {
                const updatedCart = prevCart.filter(cartItem => cartItem.id !== item.id); // Assuming each item has a unique `id`
                localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
                return updatedCart;
            });

            // Show success notification
            toast.success(`${item.title} removed from cart!`, {
                style: {
                    backgroundColor: 'white',
                    color: '#2d2d2d',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    fontSize: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    maxWidth: '350px',
                    marginTop: '10px',
                },
            });
        } catch (error) {
            toast.error('Error removing item from cart!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error(error);
        }
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
        <div className='p-3 md:p-5 lg:px-20'>
            <h1 className='text-xl md:text-3xl font-semibold mb-6 md:mb-10 text-center md:text-left'>
                Shopping Cart
                <span className='text-lg'> (Total {cart.length} item{cart.length > 1 ? 's' : ''})</span>
            </h1>
            <div className='flex flex-col lg:flex-row gap-5 md:gap-10'>
                {/* Cart Items */}
                <div className='lg:w-2/3 w-full'>
                    {cart.length > 0 ? cart.map((item, index) => (
                        <div key={index} className='bg-slate-50 p-3 md:p-5 flex flex-col md:flex-row items-center gap-3 md:gap-5 rounded-lg mb-3 md:mb-5 shadow-sm hover:shadow-md transition-shadow'>
                            <div className='w-24 h-20 md:w-32 md:h-24 bg-slate-300 flex-shrink-0 rounded-lg overflow-hidden'>
                                <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                            </div>
                            <div className='flex flex-col w-full text-center md:text-left'>
                                <p className='font-semibold text-lg md:text-xl'>{item.title}</p>
                                <p className='text-sm md:text-base text-gray-600'>{item.description}</p>
                                <p className='text-red-700 font-semibold text-lg md:text-base'>रु {item.price}</p>
                            </div>
                            <div className='flex flex-col items-center md:items-end w-full'>
                                <button className='text-red-700 font-semibold text-sm md:text-base hover:underline' onClick={() => removeItem(item)}>Remove</button>
                                <div className='mt-2 flex items-center gap-2'>
                                    <span className='text-sm md:text-base'>Qty:</span>
                                    <button className='py-1 px-3 bg-gray-200 rounded-md text-sm md:text-base hover:bg-gray-300 transition-colors' onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span className='text-sm md:text-base'>{item.quantity}</span>
                                    <button className='py-1 px-3 bg-gray-200 rounded-md text-sm md:text-base hover:bg-gray-300 transition-colors' onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500 text-sm md:text-base">Your cart is empty.</p>}
                </div>

                {/* Summary */}
                <div className='bg-slate-50 w-full lg:w-1/3 p-3 md:p-5 rounded-lg shadow-sm'>
                    <h2 className='font-semibold text-lg md:text-xl border-b-2 pb-2 text-center md:text-left'>Summary</h2>
                    <div className='border-b-2 py-2 text-sm md:text-lg'>
                        <div className='flex justify-between my-2 md:my-3'>
                            <p>Subtotal</p>
                            <p className='text-red-700 font-semibold'>रु {calculateTotalPrice()}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Shipping (Free, 1-3 Days)</p>
                            <p className='text-red-700 font-semibold'>रु 0</p>
                        </div>
                    </div>
                    <div className='border-b-2 py-2'>
                        <input type='text' placeholder='Enter Coupon Code' className='my-3 w-full h-9 md:h-10 border-2 border-gray-300 bg-white outline-none px-2 md:px-3 rounded-md text-sm md:text-base focus:border-red-700 transition-colors' />
                        <button className='w-full py-2 bg-gray-400 rounded-md font-semibold hover:bg-gray-500 transition text-sm md:text-base'>Apply</button>
                    </div>
                    <div className='flex justify-between border-b-2 py-2 text-sm md:text-lg'>
                        <p>Grand Total</p>
                        <p className='text-red-700 font-semibold'>रु {calculateTotalPrice()}</p>
                    </div>
                    <button className='w-full py-2 md:py-3 text-white bg-red-700 mt-3 md:mt-5 rounded-md hover:bg-red-800 transition text-sm md:text-base'>Proceed to Checkout</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Cart;