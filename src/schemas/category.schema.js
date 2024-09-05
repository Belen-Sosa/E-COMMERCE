import { z } from "zod";


// Esquema principal de registro
export const createCategorySchema = z.object({
    name: z.string({
      required_error: "El nombre de la Categoria es requerido.",
    }),
    description: z.string({
        required_error: "La descripción debería ser un string.",
      }).max(30, {
        message: "La descripción debe contener menos de 30 caracteres.",
      }).optional(),
  });