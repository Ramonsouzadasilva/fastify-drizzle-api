import type { TransactionRepository } from '../../domain/repositories/transaction.repository';
import type {
  CreateTransactionDTO,
  TransactionEntity,
  UpdateTransactionDTO,
} from '../../domain/entities/transaction.entity';

import { drizzleClient } from '../database/drizzle-client';
import { transactions } from '../drizzle/schema';

import { eq, desc, sql } from 'drizzle-orm';
import { NotFoundError } from '../../shared/errors/not-found-error';

export class DrizzleTransactionRepository implements TransactionRepository {
  async create(data: CreateTransactionDTO): Promise<TransactionEntity> {
    const [transaction] = await drizzleClient
      .insert(transactions)
      .values({
        descricao: data.descricao,
        tipo: data.tipo,
        valor: data.valor,
        categoria: data.categoria,
        data: data.data,
        status: data.status,
        userId: data.userId,
      })
      .returning();

    return transaction as TransactionEntity;
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    const [transaction] = await drizzleClient
      .select()
      .from(transactions)
      .where(eq(transactions.id, id));

    return (transaction as TransactionEntity) ?? null;
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ transactions: TransactionEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const transactionsList = await drizzleClient
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.data))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(eq(transactions.userId, userId));

    return {
      transactions: transactionsList as TransactionEntity[],
      total: count,
    };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ transactions: TransactionEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const transactionsList = await drizzleClient
      .select()
      .from(transactions)
      .orderBy(desc(transactions.data))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(transactions);

    return {
      transactions: transactionsList as TransactionEntity[],
      total: count,
    };
  }

  async update(
    id: string,
    data: UpdateTransactionDTO,
  ): Promise<TransactionEntity> {
    const [transaction] = await drizzleClient
      .update(transactions)
      .set(data)
      .where(eq(transactions.id, id))
      .returning();

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return transaction as TransactionEntity;
  }

  async delete(id: string): Promise<void> {
    const result = await drizzleClient
      .delete(transactions)
      .where(eq(transactions.id, id));

    if (!result.rowCount) {
      throw new NotFoundError('Transaction not found');
    }
  }
}
