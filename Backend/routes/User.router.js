import { Router } from "express";
import { registerUser, loginUser } from "../Controllers/User.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();


router.route('/registeruser').post(upload.fields([{ name: "profilePicture", maxCount: 1 }]), registerUser);
router.route('/loginuser').post(loginUser);


export default router;
