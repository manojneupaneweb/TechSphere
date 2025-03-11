import { Product } from '../models/Product.model.js'
import { ApiError } from '../Utils/apiError.util.js';
import { ApiResponse } from '../Utils/apiResponse.util.js';
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { uploadOnCloudinary } from '../Utils/cloudiny.util.js';; 



const addProduct = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body); 
  const { name, price, highlights, warranty, payment_options, return_policy, description, specifications } = req.body;

  if (!name || !price || !description) {
    throw new ApiError(400, "Name, price, and description are required fields");
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
    name,
    price,
    highlights,
    warranty,
    payment_options,
    return_policy,
    description,
    specifications,
    image: imageUrl.url,
  });

  res.status(201).json(new ApiResponse(201, "Product created successfully", newProduct));
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

  // Optionally, delete the image from Cloudinary if you want to clean up after deletion
  if (product.image) {
    const imageId = product.image.split('/').pop().split('.')[0]; // Extract image ID from the URL
    await deleteFromCloudinary(imageId); // Assuming a function to delete image from Cloudinary
  }

  await product.destroy();

  res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json(new ApiResponse(200, "Product fetched successfully", product));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll();

  if (!products.length) {
    throw new ApiError(404, "No products found");
  }

  res.status(200).json(new ApiResponse(200, "Products fetched successfully", products));
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const products = await Product.findAll({
    where: { category_id: categoryId },
  });

  if (!products.length) {
    throw new ApiError(404, "No products found for this category");
  }

  res.status(200).json(new ApiResponse(200, "Products fetched successfully", products));
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
  const { query } = req.query; // Search query from the request

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const products = await Product.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { description: { [Op.iLike]: `%${query}%` } },
      ],
    },
  });

  if (!products.length) {
    throw new ApiError(404, "No products found matching your search");
  }

  res.status(200).json(new ApiResponse(200, "Products fetched successfully", products));
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
  updateProductImage
};