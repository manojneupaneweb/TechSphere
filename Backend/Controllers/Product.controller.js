import { Product } from '../models/Product.model.js'
import { ApiError } from '../Utils/apiError.util.js';
import { ApiResponse } from '../Utils/apiResponse.util.js';
import { asyncHandler } from "../Utils/asyncHandler.util.js";
import { uploadOnCloudinary } from '../Utils/cloudiny.util.js';

const addProduct = asyncHandler(async (req, res) => {
  const { name, price, highlights, warranty, payment_options, return_policy, description, specifications } = req.body;


  if (!name || !price || !highlights || !warranty || !payment_options || !return_policy || !description || !specifications) {
    throw new ApiError(400, "Missing required fields");
  }

  const localFilePath = req.files?.image[0]?.path;
  if (!localFilePath) {
    throw new ApiError(400, "Product image is required");
  }

  const imageUrl = await uploadOnCloudinary(localFilePath);
  if (!imageUrl) {
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }

  let parsedSpecifications;
  try {
    parsedSpecifications = JSON.parse(specifications);
  } catch (error) {
    throw new ApiError(400, "Invalid specifications format");
  }

  const newProduct = await Product.create({
    name,
    price,
    highlights,
    warranty,
    payment_options,
    return_policy,
    description,
    specifications: parsedSpecifications,
    image: imageUrl.url,
  });

  // Send response
  res.status(201).json(new ApiResponse(201, "Product created successfully", newProduct));
});

export { addProduct };