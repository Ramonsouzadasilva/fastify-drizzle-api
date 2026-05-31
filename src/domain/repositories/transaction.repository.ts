import type { CreateTransactionDTO, TransactionEntity, UpdateTransactionDTO } from "../entities/transaction.entity"

export interface TransactionRepository {
  create(data: CreateTransactionDTO): Promise<TransactionEntity>
  findById(id: string): Promise<TransactionEntity | null>
  findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ transactions: TransactionEntity[]; total: number }>
  findAll(page: number, limit: number): Promise<{ transactions: TransactionEntity[]; total: number }>
  update(id: string, data: UpdateTransactionDTO): Promise<TransactionEntity>
  delete(id: string): Promise<void>
}
