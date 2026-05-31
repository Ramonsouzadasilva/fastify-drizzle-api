import type { GoalRepository } from "../../../domain/repositories/goal.repository"
import type { GoalWithStats } from "../../../domain/entities/goal.entity"

export class GetAllGoalsUseCase {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(page: number, limit: number, userId?: string): Promise<{ goals: GoalWithStats[]; total: number }> {
    if (userId) {
      return await this.goalRepository.findByUserIdWithStats(userId, page, limit)
    }
    const { goals, total } = await this.goalRepository.findAll(page, limit)

    // For admin, we need to fetch stats for each goal
    const goalsWithStats = await Promise.all(
      goals.map(async (goal) => {
        const goalWithStats = await this.goalRepository.findByIdWithStats(goal.id)
        return goalWithStats!
      }),
    )

    return { goals: goalsWithStats, total }
  }
}
