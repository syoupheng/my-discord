import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Veuillez renseigner votre email")
    .email("Veuillez renseigner une adresse email valide"),
  username: z.string().min(1, "Veuillez renseigner votre nom d'utilisateur"),
  phoneNumber: z.string().optional(),
  password: z
    .string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères")
    .max(20, "Votre mot de passe doit contenir moins de 20 caractères"),
});

export const loginSchema = registerSchema.pick({ email: true, password: true });

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
