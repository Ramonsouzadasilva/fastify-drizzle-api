import type { FinancialGoalRepository } from "../../../domain/repositories/financial-goal.repository"
import type { CreateFinancialGoalDTO, FinancialGoalEntity } from "../../../domain/entities/financial-goal.entity"

export class CreateFinancialGoalUseCase {
  constructor(private readonly financialGoalRepository: FinancialGoalRepository) {}

  async execute(data: CreateFinancialGoalDTO): Promise<FinancialGoalEntity> {
    return await this.financialGoalRepository.create(data)
  }
}
