import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { getProduct, getProducts,createProduct,deleteProduct,updateProduct } from "../controllers/products.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { productSchema } from "../schemas/product.schema.js";
import { subirImagenes } from "../middlewares/Storage.js";
const router = Router();

router.get('/products',authRequired,getProducts);
router.get('/products/:id',authRequired,getProduct);

//posee 2 middlewares, uno para validar el usuario y otro para validar lo que se esta creando 

//router.post('/products',authRequired,subirImagen.single("image"),validateSchema(productSchema),createProduct);
router.post('/products',authRequired,subirImagenes,createProduct);
router.delete('/products/:id',authRequired,deleteProduct);
router.put('/products/:id',authRequired,subirImagenes,updateProduct);

export default router;