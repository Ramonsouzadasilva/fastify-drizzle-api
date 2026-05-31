import type { GoalRepository } from "../../../domain/repositories/goal.repository"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class RemoveTaskFromGoalUseCase {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(goalId: string, taskId: string): Promise<void> {
    const goal = await this.goalRepository.findById(goalId)
    if (!goal) {
      throw new NotFoundError("Goal not found")
    }

    await this.goalRepository.removeTask(goalId, taskId)
  }
}
