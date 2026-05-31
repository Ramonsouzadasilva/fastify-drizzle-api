export enum TransactionType {
  RECEITA = "RECEITA",
  DESPESA = "DESPESA",
}

export enum TransactionStatus {
  PENDENTE = "PENDENTE",
  CONFIRMADO = "CONFIRMADO",
  CANCELADO = "CANCELADO",
}

export interface TransactionEntity {
  id: string
  descricao: string
  tipo: TransactionType
  valor: number
  categoria: string
  data: Date
  status: TransactionStatus
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateTransactionDTO {
  descricao: string
  tipo: TransactionType
  valor: number
  categoria: string
  data: Date
  status?: TransactionStatus
  userId: string
}

export interface UpdateTransactionDTO {
  descricao?: string
  tipo?: TransactionType
  valor?: number
  categoria?: string
  data?: Date
  status?: TransactionStatus
}
