import { Router } from "express";
import { login,register,logout,profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
//middleware para validar los campos 
import { validateSchema } from "../middlewares/validator.middleware.js";

//importando los schemas de validacion
import { registerSchema,loginSchema } from "../schemas/auth.schema.js";

const router = Router()


router.post('/register',validateSchema(registerSchema),register);
router.post('/login',validateSchema(loginSchema),login);
router.post('/logout',logout);

router.get("/profile",authRequired,profile)

export default router;