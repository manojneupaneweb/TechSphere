import express from "express";
import {addCategory, getCategories, getCategoryById, updateCategory, deleteCategory,} from "../Controllers/Category.controller.js";
import { addSubCategory, getSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory} from "../Controllers/Category.controller.js";

const router = express.Router();

// ✅ Category Routes
router.route("/addcategory").post(addCategory);
router.route("/getallcategory").get(getCategories);
router.route("/updatecategory/:id").put(updateCategory);
router.route("/deletecategory/:id").delete(deleteCategory);
router.route("/getcategory/:id").get(getCategoryById);

// ✅ Subcategory Routes
router.route("/addsubcategory").post(addSubCategory);
router.route("/getsubcategory").get(getSubCategories);
router.route("/updatesubcategory/:id").put(updateSubCategory);
router.route("/deletesubcategory/:id").delete(deleteSubCategory);
router.route("/getsubcategory/:id").get(getSubCategoryById);
export default router;
