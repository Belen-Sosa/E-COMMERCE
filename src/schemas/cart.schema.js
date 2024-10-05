import { z } from 'zod';
import mongoose from 'mongoose';
// Validador para ObjectId
const objectIdSchema = z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
  message: "El ID del producto no es válido.",
});
export const createCartSchema = z.object({
  userId: z.string().min(1, { message: "El ID de usuario es obligatorio." }), 
  productId: objectIdSchema, // Corrige la validación del product_id
  quantity: z.number().min(1, { message: "La cantidad debe ser al menos 1." }) // Asegura que quantity sea al menos 1
});


