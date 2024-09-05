import { z } from 'zod';
import mongoose from 'mongoose';


export const createPaymentSchema = z.object({
    orderId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "El pedido no es valido.",
      }),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "El usuario es invalido",
  }),
  
  amount: z.number().positive({ message: "El total debe ser un numero positivo" }),

  paymentMethod: z.enum(['credito', 'debito', 'efectivo']).default('debito'),

  paymentStatus: z.enum(['pendiente', 'pagado', 'rechazado']).default('pendiente')
});

