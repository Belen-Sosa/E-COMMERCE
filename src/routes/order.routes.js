import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { getOrder,getOrders,deleteOrder,updateOrder } from "../controllers/orders.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

import { createOrderSchema } from "../schemas/order.schema.js";
const router = Router();

router.get('/orders',authRequired,getOrders);
router.get('/orders/:id',authRequired,getOrder);


router.delete('/orders/:id',authRequired,deleteOrder);
router.put('/orders/:id',authRequired,validateSchema(createOrderSchema),updateOrder);


export default router;