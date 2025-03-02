import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addProduct } from "../Controllers/Product.controller.js";

const router = Router();


router.route('/addproduct').post(upload.fields([{ name: "image", maxCount: 1 }]), addProduct);


export default router;
