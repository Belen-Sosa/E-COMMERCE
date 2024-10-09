import { z } from 'zod';
import mongoose from 'mongoose';
// Validador para ObjectId
const objectIdSchema = z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
  message: "El ID del producto no es válido.",
});
export const createCartSchema = z.object({
  
  productId: objectIdSchema, // Corrige la validación del product_id
  quantity: z.number().min(1, { message: "La cantidad debe ser al menos 1." }) // Asegura que quantity sea al menos 1
});


