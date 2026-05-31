import { z } from "zod"

export const createFinancialGoalSchema = z.object({
  titulo: z.string().min(3, "Title must be at least 3 characters"),
  descricao: z.string().optional(),
  valorObjetivo: z.number().positive("Goal value must be positive"),
  valorAtual: z.number().min(0, "Current value cannot be negative").optional(),
  inicio: z.string().datetime(),
  prazo: z.string().datetime(),
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]).optional(),
})

export const updateFinancialGoalSchema = z.object({
  titulo: z.string().min(3, "Title must be at least 3 characters").optional(),
  descricao: z.string().optional(),
  valorObjetivo: z.number().positive("Goal value must be positive").optional(),
  valorAtual: z.number().min(0, "Current value cannot be negative").optional(),
  inicio: z.string().datetime().optional(),
  prazo: z.string().datetime().optional(),
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]).optional(),
})

export const addTransactionToGoalSchema = z.object({
  transactionId: z.string().uuid(),
})

export const removeTransactionFromGoalSchema = z.object({
  transactionId: z.string().uuid(),
})
