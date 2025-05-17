import { Wishlist, Cart } from "../models/Others.model.js";
import { Product } from "../models/Product.model.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";


const cartlist = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;

    if (!productId || !userId) {
      return res.status(400).json({ message: "Please provide product ID and user ID" });
    }

    // Check if product already exists in cart
    const existingCartItem = await Cart.findOne({
      where: { user_id: userId, product_id: productId }
    });

    if (existingCartItem) {
      return res.status(400).json({ message: "Product already in cart" });
    }

    // Add product to cart (1 row per product)
    const cartItem = await Cart.create({
      user_id: userId,
      product_id: productId,
      quantity
    });

    return res.status(200).json({
      message: "Product added to cart",
      cartItem
    });

  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({
      message: "Error adding item to cart",
      error: error.message
    });
  }
});


const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    if (!productId || !userId) {
      return res.status(400).json({ message: "Please provide product ID and user ID" });
    }

    const cartItem = await Cart.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      }
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cartItem.destroy();

    return res.status(200).json({
      message: "Product removed from cart",
    });

  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({
      message: "Error removing item from cart",
      error: error.message,
    });
  }
});


const updateFromCart = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !userId || !quantity) {
      return res.status(400).json({ message: "Missing product ID, user ID, or quantity" });
    }

    const cartItem = await Cart.findOne({
      where: {
        user_id: userId,
        product_id: productId
      }
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json({
      message: "Cart quantity updated successfully",
      cartItem,
    });

  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({
      message: "Error updating cart",
      error: error.message,
    });
  }
});


const getCartItems = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const cartItems = await Cart.findAll({
      where: { user_id: userId },
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    // Get full product info and attach quantity from Cart
    const productIds = cartItems.map(item => item.product_id);
    const products = await Product.findAll({
      where: { id: productIds },
      attributes: ['id', 'name', 'price', 'image']
    });

    // Attach quantity and cartItemId to each product
    const cartWithQty = products.map(product => {
      const cartItem = cartItems.find(item => item.product_id === product.id);
      return {
        ...product.toJSON(),
        quantity: cartItem.quantity,
        cartItemId: cartItem.id
      };
    });

    return res.status(200).json({ product: cartWithQty });

  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart items", error: error.message });
  }
});


const addToWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    const userId = req.user.id

    console.log("userId", userId);
    console.log("product_id", product_id);
    return res.status(200).json({
      message: 'Item added to wishlist',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error adding item to wishlist',
      error: error.message
    });
  }
};


const getUserWishlist = async (req, res) => {
  const { user_id } = req.params;  // Get user_id from request params

  try {
    const wishlistItems = await Wishlist.findAll({
      where: { user_id },
      include: ['Product'],  // Assuming the Product model is associated with Wishlist
    });

    if (wishlistItems.length === 0) {
      return res.status(404).json({ message: 'No items in wishlist' });
    }

    res.status(200).json({
      message: 'Wishlist retrieved successfully',
      data: wishlistItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving wishlist',
      error: error.message
    });
  }
};

const removeFromWishlist = async (req, res) => {
  const { id } = req.params;  // Get wishlist item ID from request params

  try {
    const deletedItem = await Wishlist.destroy({
      where: { id }
    });

    if (deletedItem === 0) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.status(200).json({
      message: 'Item removed from wishlist'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error removing item from wishlist',
      error: error.message
    });
  }
};

export {
  //Cart exports
  getCartItems,
  cartlist,
  removeFromCart,
  updateFromCart,

  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
};
