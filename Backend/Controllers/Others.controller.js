import { Wishlist, Cart } from "../models/Others.model.js";
import { Product } from "../models/Product.model.js";
import { asyncHandler } from "../Utils/asyncHandler.util.js";

// cartlist controller
const cartlist = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId || !userId) {
      return res.status(400).json({ message: "Please provide product ID and user ID" });
    }

    let cartItem = await Cart.findOne({ where: { user_id: userId } });

    if (cartItem) {
      let productIds = String(cartItem.product_id).split(",").map(Number);

      if (productIds.includes(productId)) {
        return res.status(400).json({ message: "Product already in cart" });
      }

      // Push new product ID

      productIds.push(productId);
      cartItem.product_id = productIds.join(",");
      await cartItem.save();

      return res.status(200).json({
        message: "Product added to cart",
        cartItem,
      });
    }

    // Create a new cart entry for the user
    cartItem = await Cart.create({

      user_id: userId,
      product_id: productId.toString(),
      quantity: 1,
    });

    return res.status(200).json({
      message: "Item added to cart",
      cartItem,
    });

  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({
      message: "Error adding item to cart",
      error: error.message,
    });
  }
});

const getCartItems = asyncHandler(async (req, res) => {
  try {
    console.log('----------------------------------------------------------');

    const userId = req.user?.id;
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const cartItem = await Cart.findAll(
      {
        where:
        {
          user_id: userId
        }
      }
    );
    console.log("Cart Item:", cartItem);

    if (!cartItem || cartItem.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // const productIds = cartItem.map(item => item.product_id.split(",").map(Number)).flat();
    // console.log("Parsed Product IDs:", productIds);

    return res.status(200).json({ cartItem });

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

  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
};
