import type { FinancialGoalRepository } from "../../../domain/repositories/financial-goal.repository"
import type { FinancialGoalWithStats } from "../../../domain/entities/financial-goal.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class GetFinancialGoalByIdUseCase {
  constructor(private readonly financialGoalRepository: FinancialGoalRepository) {}

  async execute(id: string): Promise<FinancialGoalWithStats> {
    const goal = await this.financialGoalRepository.findByIdWithStats(id)

    if (!goal) {
      throw new NotFoundError("Financial Goal not found")
    }

    return goal
  }
}
