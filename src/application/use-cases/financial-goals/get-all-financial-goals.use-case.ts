import type { FinancialGoalRepository } from "../../../domain/repositories/financial-goal.repository"
import type { FinancialGoalWithStats } from "../../../domain/entities/financial-goal.entity"

export class GetAllFinancialGoalsUseCase {
  constructor(private readonly financialGoalRepository: FinancialGoalRepository) {}

  async execute(
    page: number,
    limit: number,
    userId?: string,
  ): Promise<{ goals: FinancialGoalWithStats[]; total: number }> {
    if (userId) {
      return await this.financialGoalRepository.findByUserIdWithStats(userId, page, limit)
    }

    const { goals, total } = await this.financialGoalRepository.findAll(page, limit)

    const goalsWithStats = await Promise.all(
      goals.map(async (goal) => {
        const goalWithStats = await this.financialGoalRepository.findByIdWithStats(goal.id)
        return goalWithStats!
      }),
    )

    return { goals: goalsWithStats, total }
  }
}
