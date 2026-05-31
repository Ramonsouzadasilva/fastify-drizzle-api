export enum FinancialGoalStatus {
  PENDENTE = "PENDENTE",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
  CANCELADA = "CANCELADA",
}

export interface FinancialGoalEntity {
  id: string
  titulo: string
  descricao?: string
  valorObjetivo: number
  valorAtual: number
  inicio: Date
  prazo: Date
  status: FinancialGoalStatus
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateFinancialGoalDTO {
  titulo: string
  descricao?: string
  valorObjetivo: number
  valorAtual?: number
  inicio: Date
  prazo: Date
  status?: FinancialGoalStatus
  userId: string
}

export interface UpdateFinancialGoalDTO {
  titulo?: string
  descricao?: string
  valorObjetivo?: number
  valorAtual?: number
  inicio?: Date
  prazo?: Date
  status?: FinancialGoalStatus
}

export interface FinancialGoalWithStats extends FinancialGoalEntity {
  percentualConcluido: number
  valorRestante: number
}
