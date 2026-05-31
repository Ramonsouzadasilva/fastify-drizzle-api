import type { TransactionRepository } from "../../../domain/repositories/transaction.repository"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class DeleteTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string): Promise<void> {
    const transaction = await this.transactionRepository.findById(id)

    if (!transaction) {
      throw new NotFoundError("Transaction not found")
    }

    await this.transactionRepository.delete(id)
  }
}
