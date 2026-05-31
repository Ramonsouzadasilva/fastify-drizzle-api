import type { GoalRepository } from "../../../domain/repositories/goal.repository"
import type { GoalWithStats } from "../../../domain/entities/goal.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class GetGoalByIdUseCase {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(id: string): Promise<GoalWithStats> {
    const goal = await this.goalRepository.findByIdWithStats(id)

    if (!goal) {
      throw new NotFoundError("Goal not found")
    }

    return goal
  }
}
