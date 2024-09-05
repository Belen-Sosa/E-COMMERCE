import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';
import {createCart,getCart,updateCart,deleteCart,addItemToCart  } from "../controllers/cart.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {  createCartSchema} from "../schemas/cart.schema.js";
const router = Router();

router.get('/cart',authRequired,getCart);
router.post('/cart',authRequired,validateSchema(createCartSchema),createCart);
router.post('/cart/add_item',authRequired,validateSchema(createCartSchema),addItemToCart);
router.delete('/cart/:id',authRequired,deleteCart);
router.put('/cart/:id',authRequired,validateSchema(createCartSchema),updateCart);

export default router;