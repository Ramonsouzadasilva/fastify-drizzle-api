import type { GoalRepository } from "../../../domain/repositories/goal.repository"
import type { CreateGoalDTO, GoalEntity } from "../../../domain/entities/goal.entity"

export class CreateGoalUseCase {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(data: CreateGoalDTO): Promise<GoalEntity> {
    return await this.goalRepository.create(data)
  }
}
