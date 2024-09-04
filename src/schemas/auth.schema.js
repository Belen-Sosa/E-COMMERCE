import { z } from "zod";

// Esquema para validar una dirección individual
const addressSchema = z.object({
  street: z
    .string()
    .optional()
    .refine((value) => typeof value === "string", {
      message: "El valor debe ser una cadena.",
    }),
  city: z
    .string({
      required_error: "La ciudad es requerida.",
    })
    .refine((value) => typeof value === "string", {
      message: "El valor debe ser una cadena.",
    }),

  zip: z
    .number({
      required_error: "El código postal es requerido.",
    })
    .int({
      message: "El código postal debe ser un número entero.",
    }),
});

// Esquema principal de registro
export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido.",
  }),
  email: z
    .string({
      required_error: "El correo electrónico es requerido.",
    })
    .email({
      message: "Correo electrónico inválido.",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(6, {
      message: "La contraseña debe contener más de 6 caracteres.",
    }),
  addresses: z.array(addressSchema).optional(),
});

//esquema para validar el Login
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo electronico es requerido.",
    })
    .email({
      message: "Correo electronico invalido.",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(6, {
      message: "La contraseña debe contener mas de 6 caracteres.",
    }),
});
 