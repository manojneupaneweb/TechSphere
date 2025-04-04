import { Category, SubCategory } from "../models/Others.model.js";

//Add a New Category
const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        console.log("category name :", name );
        
        if (!name) return res.status(400).json({ message: "Category name is required" });

        const category = await Category.create({ name });
        return res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        return res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        // console.log(".......................................................................................");
        const categories = await Category.findAll({
            // include: [{ model: SubCategory, as: "subCategories" }]
        });
        
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

//Get a Single Category by ID
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

// Update a Category
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

// Delete a Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);

        if (!category) return res.status(404).json({ message: "Category not found" });

        await category.destroy();
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};
export{addCategory, getCategories, getCategoryById, updateCategory, deleteCategory}

//subcategory

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
export{   addSubCategory, getSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory}