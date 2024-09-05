import {Router} from "express";
import {authRequired} from '../middlewares/validateToken.js';
import { getReview, getReviews,createReview,updateReview,deleteReview } from "../controllers/review.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createReviewSchema } from "../schemas/review.schema.js";

const router = Router();


router.get('/reviews',authRequired,getReviews);
router.get('/reviews/id',authRequired,getReview);
router.post('/reviews',authRequired,validateSchema(createReviewSchema),createReview);
router.delete('/reviews/:id',authRequired,deleteReview);
router.put('/reviews/:id',authRequired,validateSchema(createReviewSchema),updateReview);

export default router;