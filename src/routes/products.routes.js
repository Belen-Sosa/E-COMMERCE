import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { getProduct, getProducts,createProduct,deleteProduct,updateProduct } from "../controllers/products.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductSchema } from "../schemas/product.schema.js";
const router = Router();

router.get('/products',authRequired,getProducts);
router.get('/products/id',authRequired,getProduct);

//posee 2 middlewares, uno para validar el usuario y otro para validar lo que se esta creando 
router.post('/products',authRequired,validateSchema(createProductSchema),createProduct);
router.delete('/products/:id',authRequired,deleteProduct);
router.put('/products/:id',authRequired,validateSchema(createProductSchema),updateProduct);

export default router;