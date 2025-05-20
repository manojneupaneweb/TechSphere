import { Router } from "express";
import { registerUser, loginUser, logOutUser, updateUserProfile, deleteUser, getUserProfile, changePassword, getAllUserProfile, sendOtp, verifyOtp, changeRole } from "../Controllers/User.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = Router();

// Public routes
router.route('/register').post(upload.fields([{ name: "profilePicture", maxCount: 1 }]), registerUser);
router.route('/login').post(loginUser);

// OTP routes
router.route('/sendotp').post( sendOtp);
router.route('/verifyotp').post(verifyOtp);


// Protected routes (requires JWT)
router.route('/logout').get(verifyJWT, logOutUser);
router.route('/getprofile').get(verifyJWT, getUserProfile);
router.route('/profile/:id').put(verifyJWT, updateUserProfile);
router.route('/profile/:id').delete(verifyJWT, deleteUser);
router.route('/profile/:id/change-password').put(verifyJWT, changePassword);


//admin pannel 
router.route('/getalluser').get(verifyAdmin, getAllUserProfile);
router.route('/cheangepassword').post(verifyJWT, changePassword);
router.route('/changerole').post(verifyJWT, changeRole);

export default router;
