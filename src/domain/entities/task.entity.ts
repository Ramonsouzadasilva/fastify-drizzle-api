export enum TaskStatus {
  PENDENTE = "PENDENTE",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
  CANCELADA = "CANCELADA",
}

export enum TaskPriority {
  BAIXA = "BAIXA",
  MEDIA = "MEDIA",
  ALTA = "ALTA",
}

export interface TaskEntity {
  id: string
  title: string
  description?: string
  inicio: Date
  prazo: Date
  status: TaskStatus
  prioridade: TaskPriority
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateTaskDTO {
  title: string
  description?: string
  inicio: Date
  prazo: Date
  status?: TaskStatus
  prioridade?: TaskPriority
  userId: string
}

export interface UpdateTaskDTO {
  title?: string
  description?: string
  inicio?: Date
  prazo?: Date
  status?: TaskStatus
  prioridade?: TaskPriority
}
