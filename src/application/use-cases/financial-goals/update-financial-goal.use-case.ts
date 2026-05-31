import type { FinancialGoalRepository } from "../../../domain/repositories/financial-goal.repository"
import type { FinancialGoalEntity, UpdateFinancialGoalDTO } from "../../../domain/entities/financial-goal.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class UpdateFinancialGoalUseCase {
  constructor(private readonly financialGoalRepository: FinancialGoalRepository) {}

  async execute(id: string, data: UpdateFinancialGoalDTO): Promise<FinancialGoalEntity> {
    const goal = await this.financialGoalRepository.findById(id)

    if (!goal) {
      throw new NotFoundError("Financial Goal not found")
    }

    return await this.financialGoalRepository.update(id, data)
  }
}
