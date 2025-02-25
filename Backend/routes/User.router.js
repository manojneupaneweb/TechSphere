import { Router } from "express";
import { registerUser } from "../Controllers/User.controller.js";

const router = Router();

router.route('/registeruser').post(registerUser);

export default router;
