import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { 
  addProduct, 
  editProduct, 
  deleteProduct, 
  getProductById, 
  getAllProducts, 
  searchProducts 
} from "../Controllers/Product.controller.js";

const router = Router();

// Product Routes
router.route('/addproduct').post(upload.fields([{ name: "image", maxCount: 1 }]), addProduct);
router.route('/editproduct/:id').put(upload.fields([{ name: "image", maxCount: 1 }]), editProduct);
router.route('/deleteproduct/:id').delete(deleteProduct);
router.route('/product/:id').get(getProductById);
router.route('/products').get(getAllProducts);
router.route('/search').get(searchProducts);

export default router;
