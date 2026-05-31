import type { FinancialGoalRepository } from "../../../domain/repositories/financial-goal.repository"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class DeleteFinancialGoalUseCase {
  constructor(private readonly financialGoalRepository: FinancialGoalRepository) {}

  async execute(id: string): Promise<void> {
    const goal = await this.financialGoalRepository.findById(id)

    if (!goal) {
      throw new NotFoundError("Financial Goal not found")
    }

    await this.financialGoalRepository.delete(id)
  }
}
