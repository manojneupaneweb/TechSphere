import { Op, fn, col, where } from 'sequelize';
import { Brand, Cart, Order } from '../models/Others.model.js';
import { Product } from '../models/Product.model.js'
import User from '../models/User.model.js';
import { ApiError } from '../Utils/apiError.util.js';
import { ApiResponse } from '../Utils/apiResponse.util.js';
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { deleteFromCloudinary, uploadOnCloudinary } from '../Utils/cloudiny.util.js';
import sendMail from '../middleware/mailService.js';

const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.findAll({});

  if (!brands || brands.length === 0) {
    throw new ApiError(404, "No brands found");
  }
  res.status(200).json(new ApiResponse(200, brands, "Brands fetched successfully"));
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, warranty, category, brand, stock, return_policy, description, specifications } = req.body;

    if (
      !name ||
      !price ||
      !warranty ||
      !category ||
      !brand ||
      stock === undefined ||
      !return_policy ||
      !description ||
      !specifications
    ) {
      throw new ApiError(400, "All required fields");
    }


    const localFilePath = req.files?.image?.[0]?.path;
    if (!localFilePath) {
      throw new ApiError(400, "Product image is required");
    }

    const imageUrl = await uploadOnCloudinary(localFilePath);

    if (!imageUrl) {
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }

    const newProduct = await Product.create({
      name, price, brand, warranty, category, stock, return_policy, description, specifications,
      image: imageUrl,
    });

    res.status(201).json(new ApiResponse(201, "Product created successfully", newProduct));
  } catch (error) {
    console.error("Error creating product:", error);
    throw new ApiError(500, "Internal server error while creating product");

  }
});

const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, highlights, warranty, payment_options, return_policy, description, specifications, stock } = req.body;

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  let parsedSpecifications, parsedHighlights, parsedPaymentOptions;
  try {
    parsedSpecifications = specifications ? JSON.parse(specifications) : product.specifications;
    parsedHighlights = highlights ? JSON.parse(highlights) : product.highlights;
    parsedPaymentOptions = payment_options ? JSON.parse(payment_options) : product.payment_options;
  } catch (error) {
    throw new ApiError(400, "Invalid JSON format in one of the fields");
  }

  if (req.files?.image?.[0]?.path) {
    const imageUrl = await uploadOnCloudinary(req.files.image[0].path);
    if (!imageUrl?.url) {
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }
    product.image = imageUrl.url;
  }

  await product.update({
    name: name || product.name,
    price: price || product.price,
    highlights: parsedHighlights,
    warranty: warranty || product.warranty,
    payment_options: parsedPaymentOptions,
    return_policy: return_policy || product.return_policy,
    description: description || product.description,
    specifications: parsedSpecifications,
    stock: stock !== undefined ? stock : product.stock,
  });

  res.status(200).json(new ApiResponse(200, "Product updated successfully", product));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.image) {
    const imageId = product.image.split('/').pop().split('.')[0];
    await deleteFromCloudinary(imageId);
  }

  await product.destroy();

  res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
});

const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id?.trim();

    if (!id) {
      return next(new ApiError(400, "Product ID is required"));
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return next(new ApiError(404, "Product not found"));
    }

    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
  } catch (error) {
    console.error("Error fetching product:", error);
    return next(new ApiError(500, "Internal server error while fetching product"));
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({});

  if (!products || products.length === 0) {
    throw new ApiError(404, "No products found");
  }

  res.status(200).json(
    new ApiResponse(200, products, "Products fetched successfully")
  );
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const products = await Product.findAll({
    // where: { category: categoryId },
  });

  if (!products.length) {
    throw new ApiError(404, "No products found for this category");
  }

  // res.status(200).json(new ApiResponse(200, "Products fetched successfully", products));
});

const getProductsByBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;

  const products = await Product.findAll({
    where: { brand_id: brandId },
  });

  if (!products.length) {
    throw new ApiError(404, "No products found for this brand");
  }

  res.status(200).json(new ApiResponse(200, "Products fetched successfully", products));
});

const searchProducts = asyncHandler(async (req, res) => {
  const query = req.params.content;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const lowerQuery = query.toLowerCase();

  try {
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          where(fn('LOWER', col('name')), { [Op.like]: `%${lowerQuery}%` }),
          where(fn('LOWER', col('description')), { [Op.like]: `%${lowerQuery}%` }),
          where(fn('LOWER', col('category')), { [Op.like]: `%${lowerQuery}%` }),
          where(fn('LOWER', col('brand')), { [Op.like]: `%${lowerQuery}%` }),
        ],
      },
    });
    res.status(200).json({
      status: 200,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    throw new ApiError(500, "Internal server error while searching products");
  }
});

const updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  if (stock === undefined || stock < 0) {
    throw new ApiError(400, "Invalid stock value");
  }

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.stock = stock;
  await product.save();

  res.status(200).json(new ApiResponse(200, "Stock updated successfully", product));
});

const addProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    throw new ApiError(400, "Rating and comment are required");
  }

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const newReview = {
    rating,
    comment,
    date: new Date(),
  };

  // Add review to the product's reviews field
  const reviews = product.reviews ? [...product.reviews, newReview] : [newReview];
  product.reviews = reviews;

  // Recalculate the average rating
  const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
  product.ratings = totalRatings / reviews.length;

  await product.save();

  res.status(201).json(new ApiResponse(201, "Review added successfully", product));
});

const getProductReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!product.reviews || product.reviews.length === 0) {
    throw new ApiError(404, "No reviews found for this product");
  }

  res.status(200).json(new ApiResponse(200, "Product reviews fetched successfully", product.reviews));
});

const updateProductImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const localFilePath = req.files?.image?.[0]?.path;
  if (!localFilePath) {
    throw new ApiError(400, "New product image is required");
  }

  const imageUrl = await uploadOnCloudinary(localFilePath);
  if (!imageUrl?.url) {
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }

  product.image = imageUrl.url;
  await product.save();

  res.status(200).json(new ApiResponse(200, "Product image updated successfully", product));
});

const createOrder = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id;
    const orderItems = req.body.orderItems;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items must be a non-empty array." });
    }

    const createdOrders = [];

    for (const item of orderItems) {
      const existingOrder = await Order.findOne({
        where: {
          user_id: userId,
          product_id: item.productId,
        },
      });

      if (existingOrder && existingOrder.order_status !== "pending") {
        existingOrder.quantity += item.quantity;
        await existingOrder.save();
        createdOrders.push(existingOrder);
      } else {
        const newOrder = await Order.create({
          user_id: userId,
          product_id: item.productId,
          quantity: item.quantity,
          payment_status: item.paymentStatus,
          order_status: item.orderStatus,
        });
        createdOrders.push(newOrder);
      }
    }

    await Cart.destroy({
      where: { user_id: userId },
    });

    res.status(201).json({ message: "Order placed successfully", orders: createdOrders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error while creating order." });
  }
});

const AllOrder = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // If admin: Fetch all orders
    if (userRole === "admin") {
      const orders = await Order.findAll({
        order: [["createdAt", "DESC"]],
      });

      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found." });
      }

      const detailedOrders = await Promise.all(
        orders.map(async (order) => {
          const user = await User.findByPk(order.user_id, {
            attributes: ["fullname", "email"],
          });

          const product = await Product.findByPk(order.product_id, {
            attributes: ["name", "price", "image"],
          });

          return {
            ...order.toJSON(),
            user,
            product,
          };
        })
      );

      return res.status(200).json({
        message: "Orders fetched successfully",
        orders: detailedOrders,
      });
    }

    // If not admin: Fetch only user's own orders
    const orders = await Order.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    const detailedOrders = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findByPk(order.user_id, {
          attributes: ["fullname", "email", "profilePicture", "phone"],
        });

        const product = await Product.findByPk(order.product_id, {
          attributes: ["name", "price", "image"],
        });

        return {
          ...order.toJSON(),
          user,      // <-- you forgot to include this
          product,
        };
      })
    );

    res.status(200).json({
      message: "Orders fetched successfully",
      orders: detailedOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching orders.",
    });
  }
});

const ChengeStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: "Order ID and Status are required." });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const user = await User.findByPk(order.user_id, {
      attributes: ["email", "fullName", "shipping_address"]
    });

    const isCompletingOrder = status === "complete" && order.order_status !== "complete";

    if (isCompletingOrder && user) {
      const product = await Product.findByPk(order.product_id, {
        attributes: ["name", "price"]
      });

      if (product) {
        await sendMail({
          to: user.email,
          subject: "✅ Your Order is Complete!",
          html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hello ${user.fullName || "Valued Customer"},</h2>
      <p>We’re happy to inform you that your order has been <strong>successfully completed</strong>. Below are the details of your purchase:</p>
      
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Product</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f4f4f4;">Price</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f4f4f4;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${product.price}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${status.charAt(0).toUpperCase() + status.slice(1)}</td>
          </tr>
        </tbody>
      </table>

      <p><strong>Shipping Address:</strong><br/>${user.shipping_address}</p>
      
      <p>If you have any questions, our support team is always here to help. Just reply to this email or contact us through our website.</p>
      
      <p>Thank you for shopping with TechSphere. We appreciate your trust and hope to serve you again soon!</p>
      
      <br/>
      <p>Best regards,<br/>The TechSphere Team</p>
    </div>
  `
        });


        console.log("Order completion email sent to:", user.email);
      }
    }

    order.order_status = status;
    await order.save();

    res.status(200).json(
      new ApiResponse(200, "Order status updated successfully", order)
    );
  } catch (error) {
    console.error("ChangeStatus Error:", error);
    res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
});











export {
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getProductsByCategory,
  getProductsByBrand,
  searchProducts,
  updateStock,
  addProductReview,
  getProductReviews,
  updateProductImage,
  getAllBrand,



  //order 
  createOrder,
  AllOrder,
  ChengeStatus
};