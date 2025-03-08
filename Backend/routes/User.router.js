import { Router } from "express";
import { 
  registerUser, 
  loginUser, 
  logOutUser, 
  updateUserProfile, 
  deleteUser, 
  getUserProfile, 
  changePassword 
} from "../Controllers/User.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import verifyJWT from "../middleware/authMiddleware.js";

const router = Router();

// Public routes
router.route('/register').post(upload.fields([{ name: "profilePicture", maxCount: 1 }]), registerUser);
router.route('/login').post(loginUser);

// Protected routes (requires JWT)
router.route('/logout').get(verifyJWT, logOutUser);
router.route('/getprofile').get(verifyJWT, getUserProfile);
router.route('/profile/:id').put(verifyJWT, updateUserProfile);
router.route('/profile/:id').delete(verifyJWT, deleteUser);
router.route('/profile/:id/change-password').put(verifyJWT, changePassword);

export default router;
