import type {
  CreateFinancialGoalDTO,
  FinancialGoalEntity,
  FinancialGoalWithStats,
  UpdateFinancialGoalDTO,
} from "../entities/financial-goal.entity"

export interface FinancialGoalRepository {
  create(data: CreateFinancialGoalDTO): Promise<FinancialGoalEntity>
  findById(id: string): Promise<FinancialGoalEntity | null>
  findByIdWithStats(id: string): Promise<FinancialGoalWithStats | null>
  findByUserId(userId: string, page: number, limit: number): Promise<{ goals: FinancialGoalEntity[]; total: number }>
  findByUserIdWithStats(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ goals: FinancialGoalWithStats[]; total: number }>
  findAll(page: number, limit: number): Promise<{ goals: FinancialGoalEntity[]; total: number }>
  update(id: string, data: UpdateFinancialGoalDTO): Promise<FinancialGoalEntity>
  delete(id: string): Promise<void>
  addTransaction(goalId: string, transactionId: string): Promise<void>
  removeTransaction(goalId: string, transactionId: string): Promise<void>
  updateValorAtual(goalId: string, valor: number): Promise<void>
}
