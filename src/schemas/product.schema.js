import { z } from "zod";

import mongoose from 'mongoose';

// Validador personalizado para ObjectId de MongoDB
const objectIdSchema = z.string().refine((value) => {
    return mongoose.Types.ObjectId.isValid(value);
  }, {
    message: "La categoría debe ser un ObjectId válido.",
  });



// Validación de las imágenes (arreglo de cadenas)
const imagesSchema = z.array(z.string().url()); // Validamos que sea un array de URLs válidas

// Esquema principal de registro
export const createProductSchema = z.object({
    name: z.string({
      required_error: "El nombre de el producto es requerido.",
    }),
    description: z.string({
        required_error: "La descripción es requerida.",
      }).max(30, {
        message: "La descripción debe contener menos de 30 caracteres.",
      }),
    price: z.number({
        required_error: "El precio de el producto es requerido y debe ser un numero.",

    }),
    category: objectIdSchema, // Validamos que sea un ObjectId válido
    stock: z.number().min(0).default(0), // Stock con valor mínimo 0
    images: imagesSchema, // Validación del arreglo de imágenes
   
  });