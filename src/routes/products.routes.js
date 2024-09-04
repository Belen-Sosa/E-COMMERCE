import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';

const router = Router();

router.get('/products',authRequired,getCategories);
router.get('/products/id',authRequired,getCategory);
router.post('/products',authRequired,createCategory);
router.delete('/products/:id',authRequired,deleteCategory);
router.put('/products/id',authRequired,updateCategory);

export default router;