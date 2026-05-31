import type { FinancialGoalRepository } from "../../../domain/repositories/financial-goal.repository"
import type { TransactionRepository } from "../../../domain/repositories/transaction.repository"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class RemoveTransactionFromFinancialGoalUseCase {
  constructor(
    private readonly financialGoalRepository: FinancialGoalRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(goalId: string, transactionId: string): Promise<void> {
    const goal = await this.financialGoalRepository.findById(goalId)
    if (!goal) {
      throw new NotFoundError("Financial Goal not found")
    }

    const transaction = await this.transactionRepository.findById(transactionId)
    if (!transaction) {
      throw new NotFoundError("Transaction not found")
    }

    await this.financialGoalRepository.removeTransaction(goalId, transactionId)

    // Update valorAtual
    const newValorAtual = Math.max(0, goal.valorAtual - transaction.valor)
    await this.financialGoalRepository.updateValorAtual(goalId, newValorAtual)
  }
}
