import type { TransactionRepository } from "../../../domain/repositories/transaction.repository"
import type { CreateTransactionDTO, TransactionEntity } from "../../../domain/entities/transaction.entity"

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(data: CreateTransactionDTO): Promise<TransactionEntity> {
    return await this.transactionRepository.create(data)
  }
}
