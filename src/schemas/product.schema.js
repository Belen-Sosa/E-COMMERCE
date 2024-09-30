import { z } from "zod";
import mongoose from 'mongoose';

// Validador personalizado para ObjectId de MongoDB
const objectIdSchema = z.string().refine((value) => {
    return mongoose.Types.ObjectId.isValid(value);
}, {
    message: "La categoría debe ser un ObjectId válido.",
});

// Esquema principal de producto (para crear y actualizar)
export const productSchema = z.object({
    name: z.string({
        required_error: "El nombre del producto es requerido.",
    }).optional(), // Opcional para actualización
    description: z.string({
        required_error: "La descripción es requerida.",
    }).max(30, {
        message: "La descripción debe contener menos de 30 caracteres.",
    }).optional(), // Opcional para actualización
    price: z.number({
        required_error: "El precio del producto es requerido y debe ser un número.",
    }).optional(), // Opcional para actualización
    category: objectIdSchema.optional(), // Opcional para actualización
    stock: z.number({
        required_error: "El stock del producto debe ser un número.",
    }).min(0).default(0).optional(), // Opcional para actualización
    image: z.string({
        required_error: "La imagen debe ser un string",
    }).optional().nullable().refine((val) => {
        if (!val) return true; // Permitir null o undefined
        return val.endsWith(".jpg") || val.endsWith(".png"); // Validar la extensión
    }, {
        message: "La imagen debe tener una extensión .jpg o .png",
    }),
});
