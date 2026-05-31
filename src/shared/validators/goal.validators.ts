import { z } from "zod"

export const createGoalSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  inicio: z.string().datetime(),
  prazo: z.string().datetime(),
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]).optional(),
  tarefas: z.array(z.string().uuid()).optional(),
})

export const updateGoalSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z.string().optional(),
  inicio: z.string().datetime().optional(),
  prazo: z.string().datetime().optional(),
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]).optional(),
})

export const addTaskToGoalSchema = z.object({
  id: z.string().uuid(),
})

export const removeTaskFromGoalSchema = z.object({
  id: z.string().uuid(),
})
