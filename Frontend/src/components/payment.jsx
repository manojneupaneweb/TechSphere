import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const createOrder = async () => {
            try {
                const query = new URLSearchParams(location.search);
                const data = query.get("data");

                if (!data || data === "null") {
                    toast.error("Invalid payment data.");
                    return;
                }

                const parsed = JSON.parse(atob(data));
                console.log("Parsed Payment Data:", parsed);

                if (parsed.status !== "COMPLETE") {
                    toast.error("Payment failed or incomplete.");
                    return;
                }

                const cartItem = await axios.get("api/v1/product/getcartitem", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const orderItems = cartItem.data.product.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    cartId: item.cartItemId,
                    paymentStatus: parsed.status,
                    orderStatus: "pending",
                    address:item.address,
                }));

                await axios.post(
                    "/api/v1/order/createorder",
                    { orderItems },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );

                toast.success("Order placed successfully!");
                setIsProcessing(false);

                // Redirect after showing success for 2 seconds
                setTimeout(() => navigate("/account"), 2000);
            } catch (err) {
                console.error("Error:", err);
                toast.error(err.response?.data?.message || "An error occurred.");
                setTimeout(() => navigate("/cart"), 2000);
            }
        };

        createOrder();
    }, [location]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                {/* eSewa Header */}
                <div className="bg-[#1EBE4A] py-4 px-6 flex items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#1EBE4A"
                            className="w-8 h-8"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white">eSewa Payment</h1>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center">
                    {isProcessing ? (
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-[#1EBE4A] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600">Processing your payment...</p>
                        </div>
                    ) : (
                        <>
                            {/* Success Animation */}
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="#1EBE4A"
                                        className="w-16 h-16 animate-scale-in"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                            <p className="text-gray-600 text-center mb-4">
                                Thank you for your purchase. Redirecting to your account...
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Animation styles */}
            <style jsx global>{`
                @keyframes scale-in {
                    0% { transform: scale(0); opacity: 0; }
                    80% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;