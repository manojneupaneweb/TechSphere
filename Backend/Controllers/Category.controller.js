import { sequelize } from "../Config/Connect.js";
import { Brand, Category, SubCategory } from "../models/Others.model.js";
import { Product } from "../models/Product.model.js";
import { ApiResponse } from "../Utils/apiResponse.util.js";
import { Op } from "sequelize"

//Add a New Category
const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Category name is required" });

        const category = await Category.create({ name });
        return res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        return res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({});

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};


const getProductByCategories = async (req, res) => {
    try {
        const category = req.params.category;

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }
        if (category === "Newproducts") {
            const products = await Product.findAll({
                order: [['createdAt', 'DESC']],
                limit: 7,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            return res.status(200).json(products);
        }

        const products = await Product.findAll({
            where: {
                category: {
                    [Op.eq]: category
                }
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        return res.status(200).json(products);

    } catch (error) {
        return res.status(500).json({ message: "Error fetching products by category", error: error.message });
    }
};


const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id, {
            include: [{ model: SubCategory, as: "subCategories" }]
        });

        if (!category) return res.status(404).json({ message: "Category not found" });

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching category", error: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        category.name = name || category.name;
        await category.save();

        return res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        return res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.replace(/^:/, "");

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();
        return res.status(200).json({ message: "Category deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};

export { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getProductByCategories }

//----------------------------Brand and category ----------------------------------
const getProductByCategoriesAndBrand = async (req, res) => {
  try {
    const { category, brand } = req.params;

    if (!category || !brand) {
      return res.status(400).json({ message: "Categories and brand are required" });
    }

    // First: strict match on category + brand + name includes both
    let products = await Product.findAll({
      where: {
        category,
        brand,
        name: {
          [Op.and]: [
            { [Op.like]: `%${category}%` },
            { [Op.like]: `%${brand}%` },
          ],
        },
      },
    });

    if (products.length === 0) {
      products = await Product.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${category}%` } },
            { name: { [Op.like]: `%${brand}%` } },
          ],
        },
      });
    }

    if (products.length === 0) {
      products = await Product.findAll({
        where: {
          brand,
        },
      });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching products by category and brand",
      error: error.message,
    });
  }
};











//----------------------------Brand ----------------------------------
// Add a New
const addBrand = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Brand name is required" });

        const brand = await Brand.create({ name });

        return res.status(201).json({ message: "Brand created successfully", brand });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: "Error creating Brand", error: error.message });
    }
};

const getAllBrand = async (req, res) => {
    try {

        const brands = await Brand.findAll({});
        return res.status(200).json(brands);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching brands", error: error.message });
    }
};

const getProductByBrand = async (req, res) => {

    try {

        const { brand } = req.params;
        const cleanedBrand = brand.replace(/^:/, '');

        if (!brand) {
            return res.status(400).json({ message: "Brand are required" });
        }

        const products = await Product.findAll({
            where: {
                brand: cleanedBrand,
            }
        });

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products by category and brand", error: error.message });
    }
}
// Delete a Brand
const deleteBrand = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.replace(/^:/, "");

        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        await brand.destroy();
        return res.status(200).json({ message: "Brand deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Error deleting Brand", error: error.message });
    }
};

export { addBrand, getAllBrand, deleteBrand, getProductByBrand }












//------------------------- subcategory ----------------------------------

//  Add a Sub-Category (Linked to a Category)
const addSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;

        if (!name || !categoryId) return res.status(400).json({ message: "Name and Category ID are required" });

        // Ensure the category exists before adding a sub-category
        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(404).json({ message: "Category not found" });

        const subCategory = await SubCategory.create({ name, categoryId });
        return res.status(201).json({ message: "Sub-category created successfully", subCategory });
    } catch (error) {
        return res.status(500).json({ message: "Error creating sub-category", error: error.message });
    }
};

// Get All Sub-Categories
const getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.findAll({
            include: [{ model: Category, as: "category" }]
        });
        return res.status(200).json(subCategories);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching sub-categories", error: error.message });
    }
};

// Get a Single Sub-Category by ID
const getSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findByPk(id, {
            include: [{ model: Category, as: "category" }]
        });

        if (!subCategory) return res.status(404).json({ message: "Sub-category not found" });

        return res.status(200).json(subCategory);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching sub-category", error: error.message });
    }
};

// Update a Sub-Category
const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categoryId } = req.body;

        const subCategory = await SubCategory.findByPk(id);
        if (!subCategory) return res.status(404).json({ message: "Sub-category not found" });

        if (categoryId) {
            const category = await Category.findByPk(categoryId);
            if (!category) return res.status(404).json({ message: "Category not found" });
            subCategory.categoryId = categoryId;
        }

        subCategory.name = name || subCategory.name;
        await subCategory.save();

        return res.status(200).json({ message: "Sub-category updated successfully", subCategory });
    } catch (error) {
        return res.status(500).json({ message: "Error updating sub-category", error: error.message });
    }
};

// Delete a Sub-Category
const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findByPk(id);

        if (!subCategory) return res.status(404).json({ message: "Sub-category not found" });

        await subCategory.destroy();
        return res.status(200).json({ message: "Sub-category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting sub-category", error: error.message });
    }
};
export { addSubCategory, getSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory, getProductByCategoriesAndBrand }