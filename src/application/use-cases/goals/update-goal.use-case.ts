import type { GoalRepository } from "../../../domain/repositories/goal.repository"
import type { GoalEntity, UpdateGoalDTO } from "../../../domain/entities/goal.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class UpdateGoalUseCase {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(id: string, data: UpdateGoalDTO): Promise<GoalEntity> {
    const goal = await this.goalRepository.findById(id)

    if (!goal) {
      throw new NotFoundError("Goal not found")
    }

    return await this.goalRepository.update(id, data)
  }
}
