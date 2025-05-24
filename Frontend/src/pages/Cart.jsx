import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading.jsx';
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import "crypto-js/hmac-sha256";
import "crypto-js/enc-base64";
import { useNavigate } from 'react-router-dom';
import { handelcartcount } from '../utils/Cart.utils.js';
import { CartContext } from '../context/CartContext.jsx';

// Nepal provinces and districts data
const nepalAddressData = {
    provinces: [
        {
            id: 1,
            name: "Province 1",
            districts: [
                "Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang", "Okhaldhunga",
                "Panchthar", "Sankhuwasabha", "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur"
            ]
        },
        {
            id: 2,
            name: "Province 2",
            districts: [
                "Bara", "Parsa", "Rautahat", "Sarlahi", "Dhanusha", "Mahottari", "Saptari", "Siraha"
            ]
        },
        {
            id: 3,
            name: "Bagmati Province",
            districts: [
                "Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kathmandu", "Kavrepalanchok",
                "Lalitpur", "Makwanpur", "Nuwakot", "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok"
            ]
        },
        {
            id: 4,
            name: "Gandaki Province",
            districts: [
                "Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Myagdi",
                "Nawalpur", "Parbat", "Syangja", "Tanahun"
            ]
        },
        {
            id: 5,
            name: "Province 5",
            districts: [
                "Arghakhanchi", "Banke", "Bardiya", "Dang", "Eastern Rukum", "Gulmi",
                "Kapilvastu", "Palpa", "Parasi", "Pyuthan", "Rolpa", "Rupandehi"
            ]
        },
        {
            id: 6,
            name: "Karnali Province",
            districts: [
                "Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", "Kalikot", "Mugu",
                "Salyan", "Surkhet", "Western Rukum"
            ]
        },
        {
            id: 7,
            name: "Sudurpashchim Province",
            districts: [
                "Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", "Darchula",
                "Doti", "Kailali", "Kanchanpur"
            ]
        }
    ]
};

function Cart() {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [showAddressPopup, setShowAddressPopup] = useState(false);

    // Shipping address form state
    const [shippingAddress, setShippingAddress] = useState({
        province: "",
        district: "",
        localAddress: ""
    });

    const [filteredDistricts, setFilteredDistricts] = useState([]);

    const { setCartCount } = useContext(CartContext);

    const [formData, setFormData] = useState({
        amount: "0",
        tax_amount: "0",
        total_amount: "0",
        transaction_uuid: uuidv4(),
        product_service_charge: "0",
        product_delivery_charge: "0",
        product_code: "EPAYTEST",
        success_url: `${window.location.origin}/paymentsuccess`,
        failure_url: `${window.location.origin}/paymentfailure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: "",
        secret: "8gBm/:&EnhH.1/q",
    });

    // Handle province change to update districts
    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        setShippingAddress({ ...shippingAddress, province: selectedProvince, district: "" });

        const provinceData = nepalAddressData.provinces.find(p => p.name === selectedProvince);
        if (provinceData) {
            setFilteredDistricts(provinceData.districts);
        } else {
            setFilteredDistricts([]);
        }
    };
    const handleAddressSubmit = (e) => {
        e.preventDefault();

        const { province, district, localAddress } = shippingAddress;
        if (!province || !district || !localAddress) {
            return toast.error("Please fill all required fields.");
        }
        const accessToken = localStorage.getItem("accessToken");

        // Combine address parts into one string here
        const fullAddress = `${localAddress}, ${district}, ${province}`;

        const addressData = {
            userId: userId,
            address: fullAddress
        };

        axios.post("/api/v1/order/addshippingaddress", addressData, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                setShippingAddress({
                    province: "",
                    district: "",
                    localAddress: ""
                });

                setShowAddressPopup(false);
                setShowPaymentPopup(true);
            })
            .catch(error => {
                toast.error("Failed to add shipping address.");
                console.error(error);
            });
    };

    // Handle shipping address form submit


    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await axios.get("api/v1/product/getcartitem", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const processedCart = response.data.product.map(item => ({
                ...item,
                price: Number(item.price) || 0,
                quantity: Number(item.quantity) || 1,
                cartItemId: item.cartItemId || item.id
            }));

            setCart(processedCart);

            const totalPrice = processedCart.reduce(
                (total, item) => total + (item.price * item.quantity), 0
            );

            setFormData(prev => ({
                ...prev,
                amount: totalPrice.toString(),
                total_amount: totalPrice.toString()
            }));
        } catch (error) {
            console.error("Error getting cart items:", error);
            toast.error("Failed to fetch cart items.");
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (id, amount) => {
        try {
            const newCart = cart.map(item => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, (Number(item.quantity) || 1) + amount);
                    return {
                        ...item,
                        quantity: newQuantity
                    };
                }
                return item;
            });

            setCart(newCart);

            const updatedItem = newCart.find(item => item.id === id);

            if (!updatedItem) {
                return toast.error("Item not found in cart.");
            }

            await axios.put(
                `/api/v1/order/updatecart/${updatedItem.id}`,
                { quantity: updatedItem.quantity },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            const totalPrice = newCart.reduce(
                (total, item) => total + (item.price * item.quantity), 0
            );

            setFormData(prev => ({
                ...prev,
                amount: totalPrice.toString(),
                total_amount: totalPrice.toString()
            }));
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Error updating quantity!");
        }
    };

    const removeItem = async (item) => {
        const accessToken = localStorage.getItem("accessToken");

        try {
            await axios.delete(`/api/v1/order/removecart/${item.id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            toast.success(`${item.name} removed from cart!`);

            const newCart = cart.filter(cartItem => cartItem.cartItemId !== item.cartItemId);
            setCart(newCart);

            const totalPrice = newCart.reduce(
                (total, item) => total + (item.price * item.quantity), 0
            );

            setFormData(prev => ({
                ...prev,
                amount: totalPrice.toString(),
                total_amount: totalPrice.toString()
            }));

            // Update cart count in real-time
            const response = await handelcartcount();
            setCartCount(response.data.product.length);

        } catch (error) {
            console.error("Error removing item from cart:", error);
            toast.error("Error removing item from cart!");
        }
    };

    const generateSignature = (formData) => {
        const dataString =
            `total_amount=${formData.total_amount},` +
            `transaction_uuid=${formData.transaction_uuid},` +
            `product_code=${formData.product_code}`;

        const hmac = CryptoJS.HmacSHA256(
            CryptoJS.enc.Utf8.parse(dataString),
            CryptoJS.enc.Utf8.parse(formData.secret)
        );

        return CryptoJS.enc.Base64.stringify(hmac);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        const signature = generateSignature(formData);
        setFormData(prev => ({ ...prev, signature }));
    }, [formData.total_amount, formData.transaction_uuid, formData.product_code]);

    const handleCheckout = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

        const fieldsToSend = { ...formData };
        delete fieldsToSend.secret;

        Object.entries(fieldsToSend).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    const totalPrice = cart.reduce((total, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQuantity = Number(item.quantity) || 1;
        return total + (itemPrice * itemQuantity);
    }, 0);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[80vh]'>
                <Loading />
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className='flex justify-center items-center h-[80vh]'>
                <h1 className='text-2xl font-bold'>Your cart is empty</h1>
            </div>
        );
    }

    return (
        <div className='p-3 md:p-5 lg:px-20'>
            <h1 className='text-2xl font-bold mb-4'>
                Shopping Cart
                <span className='text-lg'> ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
            </h1>

            <div className='flex flex-col lg:flex-row gap-5 md:gap-10'>
                <div className='lg:w-2/3 w-full'>
                    {cart.map(item => {
                        const itemPrice = Number(item.price) || 0;
                        const itemQuantity = Number(item.quantity) || 1;

                        return (
                            <div key={item.id} className='bg-slate-50 p-3 md:p-5 flex flex-col md:flex-row items-center gap-3 md:gap-5 rounded-lg mb-3 md:mb-5 shadow-sm hover:shadow-md transition-shadow'>
                                <div className='w-24 h-20 md:w-32 md:h-24 bg-slate-300 flex-shrink-0 rounded-lg overflow-hidden'>
                                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                                </div>
                                <div className='flex flex-col w-full text-center md:text-left'>
                                    <p className='font-semibold text-lg md:text-xl'>{item.name}</p>
                                    <p className='text-sm md:text-base text-gray-600'>
                                        {item.description?.length > 20 ? `${item.description.slice(0, 20)}...` : item.description}
                                    </p>
                                    <p className='text-red-700 font-semibold text-lg md:text-base'>रु {itemPrice}</p>
                                </div>
                                <div className='flex flex-col items-center md:items-end w-full'>
                                    <button
                                        className='text-red-700 font-semibold text-sm md:text-base hover:underline'
                                        onClick={() => removeItem(item)}
                                    >
                                        Remove
                                    </button>
                                    <div className='mt-2 flex items-center gap-2'>
                                        <span className='text-sm md:text-base'>Qty:</span>

                                        <button
                                            className='py-1 px-3 bg-gray-200 rounded-md text-sm md:text-base hover:bg-gray-300 transition-colors disabled:opacity-50'
                                            onClick={() => updateQuantity(item.id, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>

                                        <span className='text-sm md:text-base min-w-[20px] text-center'>
                                            {item.quantity}
                                        </span>

                                        <button
                                            className='py-1 px-3 bg-gray-200 rounded-md text-sm md:text-base hover:bg-gray-300 transition-colors'
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className='mt-1 text-sm md:text-base font-semibold'>
                                        Total: रु {(itemPrice * itemQuantity)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='bg-slate-50 w-full lg:w-1/3 p-3 md:p-5 rounded-lg shadow-sm'>
                    <h2 className='font-semibold text-lg md:text-xl border-b-2 pb-2 text-center md:text-left'>Summary</h2>
                    <div className='border-b-2 py-2 text-sm md:text-lg'>
                        <div className='flex justify-between my-2 md:my-3'>
                            <p>Subtotal</p>
                            <p className='text-red-700 font-semibold'>रु {totalPrice}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Shipping (Free, 1-3 Days)</p>
                            <p className='text-red-700 font-semibold'>रु 0</p>
                        </div>
                    </div>
                    <div className='border-b-2 py-2'></div>
                    <input
                        type='text'
                        placeholder='Enter Coupon Code'
                        className='my-3 w-full h-9 md:h-10 border-2 border-gray-300 bg-white outline-none px-2 md:px-3 rounded-md text-sm md:text-base focus:border-red-700 transition-colors'
                    />
                    <button className='w-full py-2 bg-gray-400 rounded-md font-semibold hover:bg-gray-500 transition text-sm md:text-base'>
                        Apply
                    </button>
                    <div className='flex justify-between border-b-2 py-2 text-sm md:text-lg'>
                        <p>Grand Total</p>
                        <p className='text-red-700 font-semibold'>रु {totalPrice}</p>
                    </div>
                    <button
                        onClick={() => setShowAddressPopup(true)}
                        className='w-full py-2 md:py-3 text-white bg-red-700 mt-3 md:mt-5 rounded-md hover:bg-red-800 transition text-sm md:text-base'
                        disabled={cart.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>

                {/* Shipping Address Popup */}
                {showAddressPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm transition-opacity duration-300">
                        <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-fade-in-up">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Shipping Address</h2>
                                <button
                                    onClick={() => setShowAddressPopup(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleAddressSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                                        Province <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="province"
                                        value={shippingAddress.province}
                                        onChange={handleProvinceChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Province</option>
                                        {nepalAddressData.provinces.map(province => (
                                            <option key={province.id} value={province.name}>{province.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                                        District <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="district"
                                        value={shippingAddress.district}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                        disabled={!shippingAddress.province}
                                    >
                                        <option value="">Select District</option>
                                        {filteredDistricts.map((district, index) => (
                                            <option key={index} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="localAddress" className="block text-sm font-medium text-gray-700 mb-1">
                                        Local Address (Street, Ward No.) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="localAddress"
                                        value={shippingAddress.localAddress}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, localAddress: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Payment Method Popup */}
                {showPaymentPopup && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-200">
                        <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-[90%] mx-4 animate-scale-in">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-xl font-semibold text-gray-800">Complete Your Purchase</h2>
                                <button
                                    onClick={() => setShowPaymentPopup(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <button
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#05a84c] text-white rounded-lg hover:bg-[#048b42] transition-all shadow-sm"
                                >
                                    <img
                                        src="https://esewa.com.np/common/images/esewa_logo.png"
                                        alt="eSewa"
                                        className="h-5 object-contain"
                                    />
                                    Pay with eSewa
                                </button>

                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-2 bg-white text-sm text-gray-500">OR</span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-700 mb-1">Test Mode Activated</h3>
                                            <p className="text-xs text-gray-500">
                                                Use these credentials for testing:
                                            </p>
                                            <ul className="mt-2 space-y-1 text-xs text-gray-600">
                                                <li className="flex gap-2">
                                                    <span className="font-medium">ID:</span> 9806800001-9806800005
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="font-medium">MPIN:</span> 1122
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="font-medium">Password:</span> Nepal@123
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowPaymentPopup(false);
                                        handleCheckout();
                                    }}
                                    className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 mt-4"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                    </svg>
                                    Complete Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Cart;