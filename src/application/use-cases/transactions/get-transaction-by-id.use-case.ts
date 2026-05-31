import type { TransactionRepository } from "../../../domain/repositories/transaction.repository"
import type { TransactionEntity } from "../../../domain/entities/transaction.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class GetTransactionByIdUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findById(id)

    if (!transaction) {
      throw new NotFoundError("Transaction not found")
    }

    return transaction
  }
}
