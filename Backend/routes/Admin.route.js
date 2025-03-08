import { Router } from "express";
import verifyJWT from "../middleware/authMiddleware.js";
import { getAllUserProfile } from "../Controllers/Admin.controller.js";

const router = Router();

router.route('/getalluser').get(verifyJWT, getAllUserProfile);

export default router;

