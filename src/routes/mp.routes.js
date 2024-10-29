import {Router} from "express";
import { createPreference, webHook } from "../services/mercadoPagoService.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();


router.post('/preference',authRequired,createPreference);
router.post('/webhook',webHook)


export default router;