import type { GoalRepository } from "../../../domain/repositories/goal.repository"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class DeleteGoalUseCase {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(id: string): Promise<void> {
    const goal = await this.goalRepository.findById(id)

    if (!goal) {
      throw new NotFoundError("Goal not found")
    }

    await this.goalRepository.delete(id)
  }
}
