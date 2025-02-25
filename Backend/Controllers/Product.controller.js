import {Product} from '../models/Product.model.js'
import { asyncHandler } from "../Utils/asyncHandler.util.js";

// Register product
const registerProduct = asyncHandler(async (req, res) => {
  const { name, description, price, imageUrl, category, stock } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const product = await Product.create({
    name,
    description,
    price,
    imageUrl,
    category,
    stock,
  });

  res.status(201).json({
    message: 'Product registered successfully',
    product,
  });
});

export  { registerProduct }
