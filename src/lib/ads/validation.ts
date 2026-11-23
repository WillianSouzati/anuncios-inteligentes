import { z } from "zod";

export const productSchema = z.object({
  nome: z.string().trim().min(3, "Informe o nome do produto (mínimo 3 caracteres).").max(120, "Use no máximo 120 caracteres."),
  categoria: z.string().max(60),
  marca: z.string().trim().max(60, "Use no máximo 60 caracteres."),
  modelo: z.string().trim().max(60, "Use no máximo 60 caracteres."),
  estado: z.string().max(40),
  preco: z
    .string()
    .trim()
    .refine((v) => v === "" || /^\d{1,9}([.,]\d{1,2})?$/.test(v), "Informe um preço válido, ex.: 1299,90."),
  caracteristicas: z.string().trim().max(1000, "Use no máximo 1000 caracteres."),
  detalhes: z.string().trim().max(1000, "Use no máximo 1000 caracteres."),
});

export type FieldErrors = Partial<Record<keyof z.infer<typeof productSchema>, string>>;
