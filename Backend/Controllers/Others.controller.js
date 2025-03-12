import { Wishlist } from "../models/Others.model.js";


const cartlist = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    const wishlistItem = await Wishlist.create({
      user_id,
      product_id,
    });

    res.status(201).json({
      message: 'Item added to wishlist',
      data: wishlistItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error adding item to wishlist',
      error: error.message
    });
  }
};
const addToWishlist = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    console.log(user_id, product_id);
    
    const wishlistItem = await Wishlist.create({
      user_id,
      product_id, 
    });

    res.status(201).json({
      message: 'Item added to wishlist',
      data: wishlistItem
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

export{
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  cartlist,
};
