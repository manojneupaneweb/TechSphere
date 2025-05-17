import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const createOrder = async () => {
            try {
                const query = new URLSearchParams(location.search);
                const data = query.get("data");
                const parsed = JSON.parse(atob(data));
                console.log("Parsed data:", parsed);

                if (parsed.status !== "COMPLETE") {
                    toast.error("Payment failed or incomplete.");
                    return;
                }

                const cartItem = await axios.get("api/v1/product/getcartitem", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                console.log("Cart items:", cartItem.data.product);

                const orderItems = cartItem.data.product.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    cartId: item.cartItemId,
                    paymentStatus: parsed.status,
                    orderStatus: "pending",
                }));

                const response = await axios.post(
                    "/api/v1/product/createorder",
                    {
                        orderItems
                    },
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );
                console.log("Order response:", response.data);
                if (response.status !== 200) {
                    toast.error("Failed to create order.");
                    return;
                }

                toast.success("Order placed successfully!");
                navigate("/order");
            } catch (err) {
                console.error("Order creation error:", err);
                toast.error("Something went wrong during order creation.");
            }
        };

        createOrder();
    }, [location]);

    return <div className="text-center text-xl mt-10 ">Verifying your payment.....</div>;
};

export default PaymentSuccess;
