import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { getCategories, getCategory,createCategory,updateCategory,deleteCategory } from "../controllers/categories.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCategorySchema } from "../schemas/category.schema.js";

const router = Router();

router.get('/categories',authRequired,getCategories);
router.get('/categories/:id',authRequired,getCategory);
router.post('/categories',authRequired,validateSchema(createCategorySchema),createCategory);
router.delete('/categories/:id',authRequired,deleteCategory);
router.put('/categories/:id',authRequired,validateSchema(createCategorySchema),updateCategory);

export default router;