import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, editProduct, deleteProduct, getProductById, getAllProducts, searchProducts } from "../Controllers/Product.controller.js";
import verifyAdmin from "../middleware/admin.middleware.js";
import { addToWishlist, cartlist } from "../Controllers/Others.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";

const router = Router();

// Product Routes
router.route('/addproduct').post(verifyAdmin, upload.fields([{ name: "image", maxCount: 1 }]), addProduct);
router.route('/editproduct/:id').put(upload.fields([{ name: "image", maxCount: 1 }]), editProduct);
router.route('/deleteproduct/:id').delete(deleteProduct);
router.route('/product/:id').get(getProductById);
router.route('/products').get(getAllProducts);
router.route('/search').get(searchProducts);


//wishlist routes
router.route('/wishlist').post(verifyJwt, addToWishlist);
router.route('/cartlist').post(verifyJwt, cartlist);


export default router;
