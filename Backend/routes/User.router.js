import { Router } from "express";
import { registerUser } from "../Controllers/User.controller.js"; // missing .js if using ESM

const router = Router();

router.route('/register').post(registerUser);

export default router;
