import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';
import {getCart,putProductCart,deleteProductCart,addItemToCart  } from "../controllers/cart.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {  createCartSchema} from "../schemas/cart.schema.js";
const router = Router();

router.get('/cart/:user_id',authRequired,getCart);
router.post('/cart/add_item',authRequired,validateSchema(createCartSchema),addItemToCart);
router.delete('/cart/:user_id/:product_id',authRequired,deleteProductCart);
router.put('/cart/:product_id/:user_id',authRequired,putProductCart);

export default router;