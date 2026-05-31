import { z } from "zod"

export const createTransactionSchema = z.object({
  descricao: z.string().min(3, "Description must be at least 3 characters"),
  tipo: z.enum(["RECEITA", "DESPESA"]),
  valor: z.number().positive("Value must be positive"),
  categoria: z.string().min(3, "Category must be at least 3 characters"),
  data: z.string().datetime(),
  status: z.enum(["PENDENTE", "CONFIRMADO", "CANCELADO"]).optional(),
})

export const updateTransactionSchema = z.object({
  descricao: z.string().min(3, "Description must be at least 3 characters").optional(),
  tipo: z.enum(["RECEITA", "DESPESA"]).optional(),
  valor: z.number().positive("Value must be positive").optional(),
  categoria: z.string().min(3, "Category must be at least 3 characters").optional(),
  data: z.string().datetime().optional(),
  status: z.enum(["PENDENTE", "CONFIRMADO", "CANCELADO"]).optional(),
})

export const updateTransactionStatusSchema = z.object({
  status: z.enum(["PENDENTE", "CONFIRMADO", "CANCELADO"]),
})
