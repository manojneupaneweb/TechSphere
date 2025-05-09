import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading.jsx';

function Cart() {
    const accessToken = localStorage.getItem("accessToken");
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (cart?.length) {
            const calculatedTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(calculatedTotal);
        } else {
            setTotalPrice(0);
        }
    }, [cart]);

    const fetchCart = async () => {
        try {
            const response = await axios.get("/api/v1/product/getcartitem", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const cartItems = response.data.cartItem.map(async (cartItem) => {
                const productResponse = await axios.get(`/api/v1/product/${cartItem.product_id}`);
                return {
                    ...productResponse.data,
                    quantity: cartItem.quantity,
                    cartItemId: cartItem.id, // in case needed for delete
                };
            });

            const resolvedCartItems = await Promise.all(cartItems);
            setCart(resolvedCartItems);
        } catch (error) {
            console.error("Error getting cart items:", error);
            toast.error("Failed to fetch cart items.");
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (id, amount) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const removeItem = async (item) => {
        try {
            await axios.delete(`/api/v1/product/removeitem/${item.cartItemId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            toast.success(`${item.title} removed from cart!`);
            fetchCart(); // Refresh cart
        } catch (error) {
            console.error("Error removing item from cart:", error);
            toast.error("Error removing item from cart!");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);
console.log('cart', cart.id);


    return (
        <>
            {loading ? (
                <div className='flex justify-center items-center h-[80vh]'>
                    <Loading />
                </div>
            ) : (
                <div className='p-3 md:p-5 lg:px-20'>
                    <h1 className='text-2xl font-bold mb-4'>
                        Shopping Cart
                        <span className='text-lg'> (Total {cart?.length ?? 0} item{(cart?.length ?? 0) !== 1 ? 's' : ''})</span>
                    </h1>
                    <div className='flex flex-col lg:flex-row gap-5 md:gap-10'>
                        <div className='lg:w-2/3 w-full'>
                            {cart?.length > 0 ? cart.map((item) => (
                                <div key={item.id} className='bg-slate-50 p-3 md:p-5 flex flex-col md:flex-row items-center gap-3 md:gap-5 rounded-lg mb-3 md:mb-5 shadow-sm hover:shadow-md transition-shadow'>
                                    <div className='w-24 h-20 md:w-32 md:h-24 bg-slate-300 flex-shrink-0 rounded-lg overflow-hidden'>
                                        <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex flex-col w-full text-center md:text-left'>
                                        <p className='font-semibold text-lg md:text-xl'>{item.name}</p>
                                        <p className='text-sm md:text-base text-gray-600'>
                                            {item.description?.length > 20
                                                ? item.description.slice(0, 20) + '...'
                                                : item.description}
                                        </p>
                                        <p className='text-red-700 font-semibold text-lg md:text-base'>रु {item.price}</p>
                                    </div>
                                    <div className='flex flex-col items-center md:items-end w-full'>
                                        <button className='text-red-700 font-semibold text-sm md:text-base hover:underline' onClick={() => removeItem(item)}>Remove</button>
                                        <div className='mt-2 flex items-center gap-2'>
                                            <span className='text-sm md:text-base'>Qty:</span>
                                            <button
                                                className='py-1 px-3 bg-gray-200 rounded-md text-sm md:text-base hover:bg-gray-300 transition-colors'
                                                onClick={() => updateQuantity(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className='text-sm md:text-base'>{item.quantity}</span>
                                            <button
                                                className='py-1 px-3 bg-gray-200 rounded-md text-sm md:text-base hover:bg-gray-300 transition-colors'
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className='mt-1 text-sm md:text-base'>
                                            Total: रु {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-gray-500 text-sm md:text-base">Your cart is empty.</p>
                            )}
                        </div>

                        <div className='bg-slate-50 w-full lg:w-1/3 p-3 md:p-5 rounded-lg shadow-sm'>
                            <h2 className='font-semibold text-lg md:text-xl border-b-2 pb-2 text-center md:text-left'>Summary</h2>
                            <div className='border-b-2 py-2 text-sm md:text-lg'>
                                <div className='flex justify-between my-2 md:my-3'>
                                    <p>Subtotal</p>
                                    <p className='text-red-700 font-semibold'>रु {totalPrice.toFixed(2)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Shipping (Free, 1-3 Days)</p>
                                    <p className='text-red-700 font-semibold'>रु 0</p>
                                </div>
                            </div>
                            <div className='border-b-2 py-2'></div>
                            <input type='text' placeholder='Enter Coupon Code' className='my-3 w-full h-9 md:h-10 border-2 border-gray-300 bg-white outline-none px-2 md:px-3 rounded-md text-sm md:text-base focus:border-red-700 transition-colors' />
                            <button className='w-full py-2 bg-gray-400 rounded-md font-semibold hover:bg-gray-500 transition text-sm md:text-base'>Apply</button>
                            <div className='flex justify-between border-b-2 py-2 text-sm md:text-lg'>
                                <p>Grand Total</p>
                                <p className='text-red-700 font-semibold'>रु {totalPrice.toFixed(2)}</p>
                            </div>
                            <button
                                className='w-full py-2 md:py-3 text-white bg-red-700 mt-3 md:mt-5 rounded-md hover:bg-red-800 transition text-sm md:text-base'
                                disabled={cart.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
    );
}

export default Cart;
