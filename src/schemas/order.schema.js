import { z } from 'zod';
import mongoose from 'mongoose';


export const createOrderSchema = z.object({

  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "El usuario es invalido",
  }),
  items: z.array(z.object({
    productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "El id del producto es invalido",
    }),
    quantity: z.number().min(1, { message: "La cantidad debe ser al menos 1" }),
    price: z.number().positive({ message: "El precio debe ser un numero positivo" }),
  })),
  totalAmount: z.number().positive({ message: "El total debe ser un numero positivo" }),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string()
  }),
  status: z.enum(['procesando', 'enviado', 'entregado', 'cancelado']).default('procesando')
});


