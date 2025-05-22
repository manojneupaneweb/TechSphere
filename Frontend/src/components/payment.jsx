import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const esewaGreen = "#1EBE4A";

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const createOrder = async () => {
            try {
                const query = new URLSearchParams(location.search);
                const data = query.get("data");
                const parsed = JSON.parse(atob(data));
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
                }));

                const response = await axios.post(
                    "/api/v1/product/createorder",
                    { orderItems },
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );
                if (response.status !== 200) {
                    toast.error("Failed to create order.");
                    return;
                }

                toast.success("Order placed successfully!");
                setTimeout(() => navigate("/order"), 2000);
            } catch (err) {
                toast.error("Something went wrong during order creation.");
            }
        };

        createOrder();
        // eslint-disable-next-line
    }, [location]);

    return (
    <div className="min-h-screen bg-[#2dba4e] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 sm:p-6 max-w-md w-full shadow-[0_4px_24px_rgba(30,190,74,0.15)] flex flex-col items-center">
            {/* eSewa Logo Checkmark */}
            <div className="w-16 h-16 bg-[#2dba4e] rounded-full flex items-center justify-center mb-4">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M44 26L29 41L20 32"
                        stroke="#fff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            
            {/* Payment Success Message */}
            <h2 className="text-[#2dba4e] font-bold text-2xl mb-2 text-center">
                Payment Successful!
            </h2>
            
            <p className="text-gray-800 text-base text-center mb-2">
                Thank you for your payment via <span className="text-[#2dba4e] font-semibold">eSewa</span>.
            </p>
            
            <p className="text-gray-600 text-sm text-center">
                Redirecting to your orders...
            </p>
            
            {/* Optional eSewa branding */}
            <div className="mt-6 flex items-center">
                <span className="text-gray-500 text-xs mr-1">Powered by</span>
                <span className="text-[#2dba4e] font-bold">eSewa</span>
            </div>
        </div>
    </div>
);
};

export default PaymentSuccess;
