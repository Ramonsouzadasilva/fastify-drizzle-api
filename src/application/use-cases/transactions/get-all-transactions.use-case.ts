import type { TransactionRepository } from "../../../domain/repositories/transaction.repository"
import type { TransactionEntity } from "../../../domain/entities/transaction.entity"

export class GetAllTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    page: number,
    limit: number,
    userId?: string,
  ): Promise<{ transactions: TransactionEntity[]; total: number }> {
    if (userId) {
      return await this.transactionRepository.findByUserId(userId, page, limit)
    }
    return await this.transactionRepository.findAll(page, limit)
  }
}
