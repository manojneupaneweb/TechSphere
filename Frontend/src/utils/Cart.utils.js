import axios from "axios";
import { toast } from "react-toastify";
const accessToken = localStorage.getItem("accessToken");


const CartList = async (product) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return toast.error("Please login to add to cart!");
    }

    try { 
        await axios.post("/api/v1/product/cartlist", { productId: product.id }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("product" , product);
        
        toast.success(`${product.name} added to cart!`);
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add to cart!");
        console.error("Error adding to cart:", error);
    }
};


const Wishlist = async (product) => {
    try {
        // Fetch the wishlist products first
        const response = await axios.get("/api/v1/product/wishlist", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const wishlistProducts = response.data;

        // Check if the product already exists in the wishlist
        const existingProduct = wishlistProducts.some((item) => item.id === product.id);

        if (existingProduct) {
            // If product already exists in wishlist, remove it
            await axios.delete(`/api/v1/product/wishlist/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success(`${product.title} removed from Wishlist!`);
        } else {
            // If product doesn't exist, add it to wishlist
            await axios.post("/api/v1/product/wishlist", { productId: product.id }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success(`${product.title} added to Wishlist!`);
        }
    } catch (error) {
        console.error("Error managing wishlist:", error);
    }
};
 


const CartRemove = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = cart.filter(cartItem => cartItem.id !== item.id);

    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log("Removed from Cart:", item.title);
};

const updateCartItemQuantity = (itemId, change) => {
    // Retrieve the current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the item to update
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        // Update the quantity, ensuring it doesn't go below 1
        if (cart[itemIndex].quantity + change >= 1) {
            cart[itemIndex].quantity += change;
        }

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return cart; // Return the updated cart
};

export { Wishlist, CartList, CartRemove, updateCartItemQuantity, };
