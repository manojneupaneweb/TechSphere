import { Router } from "express";
import verifyJwt from "../middleware/auth.middleware.js";
import { AllOrder, ChengeStatus, createOrder } from "../Controllers/Product.controller.js";
import { cartlist, removeFromCart, updateFromCart } from "../Controllers/Others.controller.js";

const router = Router();

//Product Order
router.route('/createorder').post(verifyJwt, createOrder);
router.route('/getallorder').get(verifyJwt, AllOrder);
router.route('/changestatus').post(verifyJwt, ChengeStatus);

//cartlist routes
router.route('/cartlist').post(verifyJwt, cartlist);
router.route('/removecart/:id').delete(verifyJwt, removeFromCart);
router.route('/updatecart/:id').put(verifyJwt, updateFromCart);

export default router;
