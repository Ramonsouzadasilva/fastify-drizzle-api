export enum GoalStatus {
  PENDENTE = "PENDENTE",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
  CANCELADA = "CANCELADA",
}

export interface GoalEntity {
  id: string
  title: string
  description?: string
  inicio: Date
  prazo: Date
  status: GoalStatus
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateGoalDTO {
  title: string
  description?: string
  inicio: Date
  prazo: Date
  status?: GoalStatus
  userId: string
  tarefas?: string[]
}

export interface UpdateGoalDTO {
  title?: string
  description?: string
  inicio?: Date
  prazo?: Date
  status?: GoalStatus
}

export interface GoalWithStats extends GoalEntity {
  tarefasCompletadas: number
  tarefasTotal: number
  tarefasPercentual: number
  tarefasRestantes: number
}
