import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct, editProduct, deleteProduct, getProductById, getAllProducts, searchProducts, getProductsByCategory, getProductsByBrand } from "../Controllers/Product.controller.js";
import verifyAdmin from "../middleware/admin.middleware.js";
import { addToWishlist, cartlist, getCartItems } from "../Controllers/Others.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";

const router = Router();

// Product Routes
router.route('/addproduct').post(verifyAdmin, upload.fields([{ name: "image", maxCount: 1 }]), addProduct);
router.route('/editproduct/:id').put(upload.fields([{ name: "image", maxCount: 1 }]), editProduct);
router.route('/deleteproduct/:id').delete(deleteProduct);

router.route('/product/:id').get(getProductById);
router.route('/getallproducts').get(getAllProducts);
router.route('/search').get(searchProducts);
router.route('/:category').get(getProductsByCategory);
router.route('/:brand').get(getProductsByBrand);



//wishlist routes
router.route('/wishlist').post(verifyJwt, addToWishlist);

//cartlist routes
router.route('/cartlist').post(verifyJwt, cartlist);
router.route('/getCartItems').get(verifyJwt, getCartItems);


export default router;
