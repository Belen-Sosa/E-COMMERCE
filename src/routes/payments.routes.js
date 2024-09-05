import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { getPayment, getPayments,createPayment,updatePayment,deletePayment } from "../controllers/payments.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPaymentSchema } from "../schemas/payment.schema.js";

const router = Router();

router.get('/payments',authRequired,getPayments);
router.get('/payments/id',authRequired,getPayment);
router.post('/payments',authRequired,validateSchema(createPaymentSchema),createPayment);
router.delete('/payments/:id',authRequired,deletePayment);
router.put('/payments/:id',authRequired,validateSchema(createPaymentSchema),updatePayment);

export default router;