import { z } from 'zod';
import mongoose from 'mongoose';

export const createCartSchema = z.object({
  userId: z.string().min(1, { message: "El ID de usuario es obligatorio." }), 
  items: z.array(
    z.object({
      productId:  z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "El pedido no es valido.",
      }), 
      quantity: z.number().min(1, { message: "La cantidad debe ser al menos 1." }) // Asegura que la cantidad sea al menos 1
    })
  ),
  totalAmount: z.number().min(0, { message: "El monto total debe ser mayor a  0." }) // Valida que el totalAmount sea un número positivo
});

