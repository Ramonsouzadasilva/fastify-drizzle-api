import type { TransactionRepository } from "../../../domain/repositories/transaction.repository"
import type { TransactionEntity, UpdateTransactionDTO } from "../../../domain/entities/transaction.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class UpdateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string, data: UpdateTransactionDTO): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findById(id)

    if (!transaction) {
      throw new NotFoundError("Transaction not found")
    }

    return await this.transactionRepository.update(id, data)
  }
}
