import { z } from "zod";
import mongoose from "mongoose";


// Esquema principal de registro
export const createReviewSchema = z.object({
    productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "El producto no es valido.",
      }),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "El usuario es invalido",
  }),
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).default(1),
  comment: z.string({
    required_error: "El comentario debe ser un texto",
  }),
  });