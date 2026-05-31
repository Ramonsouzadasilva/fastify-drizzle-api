import { z } from "zod"

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  inicio: z.string().datetime(),
  prazo: z.string().datetime(),
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]).optional(),
  prioridade: z.enum(["BAIXA", "MEDIA", "ALTA"]).optional(),
})

export const updateTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z.string().optional(),
  inicio: z.string().datetime().optional(),
  prazo: z.string().datetime().optional(),
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]).optional(),
  prioridade: z.enum(["BAIXA", "MEDIA", "ALTA"]).optional(),
})

export const updateTaskStatusSchema = z.object({
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]),
})
