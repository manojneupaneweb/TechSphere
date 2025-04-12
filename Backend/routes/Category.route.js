import express from "express";
import {addCategory, getCategories, getCategoryById, updateCategory, deleteCategory, addBrand, getBrand, deleteBrand, getProductByCategories, getProductByCategoriesAndBrand, getProductByBrand,} from "../Controllers/Category.controller.js";
import { addSubCategory, getSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory} from "../Controllers/Category.controller.js";

const router = express.Router();

// ✅ Category Routes
router.route("/addcategory").post(addCategory);
router.route("/getallcategory").get(getCategories);
router.route("/deletecategory/:id").delete(deleteCategory);
router.route("/getproductbycategories/:category").get(getProductByCategories);

// ✅ Brand Routes
router.route("/addbrand").post(addBrand);
router.route("/getallbrand").get(getBrand);
router.route("/deletebrand/:id").delete(deleteBrand);


router.route("/:category/:brand").get(getProductByCategoriesAndBrand);
router.route("/:brand").get(getProductByBrand);


// ✅ Subcategory Routes
router.route("/addsubcategory").post(addSubCategory);
router.route("/getsubcategory").get(getSubCategories);
router.route("/updatesubcategory/:id").put(updateSubCategory);
router.route("/deletesubcategory/:id").delete(deleteSubCategory);
router.route("/getsubcategory/:id").get(getSubCategoryById);
export default router;
