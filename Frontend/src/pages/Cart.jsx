import React from 'react';

function Cart() {
    return (
        <div className=' md:p-5 lg:px-20'>
            <h1 className='text-2xl md:text-3xl font-semibold mb-10 text-center md:text-left'>Shopping Cart</h1>
            <div className='flex flex-col lg:flex-row gap-10'>
                {/* Cart Items */}
                <div className='lg:w-2/3 w-full'>
                    {[1, 3].map((item, index) => (
                        <div key={index} className='bg-slate-100 p-5 flex flex-col md:flex-row items-center gap-5 rounded-lg mb-5'>
                            <div className='w-32 h-24 bg-slate-300 flex-shrink-0'></div>
                            <div className='flex flex-col w-full'>
                                <p className='font-semibold text-center md:text-left'>Dell 27 Monitor - S2725H (IPS, 100Hz Refresh Rate)</p>
                                <p className='text-red-700 font-semibold text-center md:text-left'>रु 31,500</p>
                            </div>
                            <div className='flex flex-col items-center md:items-end w-full'>
                                <button className='text-red-700 font-semibold hover:underline'>Remove</button>
                                <div className='mt-2 flex items-center gap-2'>
                                    <span>Qty:</span>
                                    <button className='py-1 px-3 bg-gray-200 rounded-md'>1</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Summary */}
                <div className='bg-slate-100 w-full lg:w-1/3 p-5 rounded-lg'>
                    <h2 className='font-semibold text-xl border-b-2 pb-2'>Summary</h2>
                    <div className='border-b-2 py-2 text-lg'>
                        <div className='flex justify-between my-3'>
                            <p>Subtotal</p>
                            <p className='text-red-700 font-semibold'>रु 31,500</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Shipping (Free, 1-3 Days)</p>
                            <p className='text-red-700 font-semibold'>रु 0</p>
                        </div>
                    </div>
                    <div className='border-b-2 py-2'>
                        <input type='text' placeholder='Enter Coupon Code' className='my-3 w-full h-10 border-2 border-gray-300 bg-white outline-none px-3 rounded-md' />
                        <button className='w-full py-2 bg-gray-400 rounded-md font-semibold hover:bg-gray-500 transition'>Apply</button>
                    </div>
                    <div className='flex justify-between border-b-2 py-2 text-lg'>
                        <p>Grand Total</p>
                        <p className='text-red-700 font-semibold'>रु 31,500</p>
                    </div>
                    <button className='w-full py-3 text-white bg-red-700 mt-5 rounded-md hover:bg-red-800 transition'>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
