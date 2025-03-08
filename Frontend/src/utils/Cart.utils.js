const CartAdd = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Added to Cart:", product);
};

const CartRemove = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = cart.filter(cartItem => cartItem.id !== item.id);

    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log("Removed from Cart:", item.title);
};

// utils/Cart.utils.js

/**
 * Updates the quantity of an item in the cart.
 * @param {string} itemId - The unique ID of the item to update.
 * @param {number} change - The change in quantity (e.g., +1 or -1).
 * @returns {Array} - The updated cart.
 */
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

export { CartAdd, CartRemove , updateCartItemQuantity};
