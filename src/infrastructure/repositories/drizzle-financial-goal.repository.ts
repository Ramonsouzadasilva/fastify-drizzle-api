import { eq, desc, sql, and } from 'drizzle-orm';

import type { FinancialGoalRepository } from '../../domain/repositories/financial-goal.repository';
import type {
  CreateFinancialGoalDTO,
  FinancialGoalEntity,
  FinancialGoalWithStats,
  UpdateFinancialGoalDTO,
} from '../../domain/entities/financial-goal.entity';

import { NotFoundError } from '../../shared/errors/not-found-error';
import { drizzleClient } from '../database/drizzle-client';
import { financialGoals, financialGoalTransactions } from '../drizzle/schema';

export class DrizzleFinancialGoalRepository implements FinancialGoalRepository {
  async create(data: CreateFinancialGoalDTO): Promise<FinancialGoalEntity> {
    const [goal] = await drizzleClient
      .insert(financialGoals)
      .values({
        titulo: data.titulo,
        descricao: data.descricao,
        valorObjetivo: data.valorObjetivo,
        valorAtual: data.valorAtual ?? 0,
        inicio: data.inicio,
        prazo: data.prazo,
        status: data.status,
        userId: data.userId,
      })
      .returning();

    return goal as FinancialGoalEntity;
  }

  async findById(id: string): Promise<FinancialGoalEntity | null> {
    const [goal] = await drizzleClient
      .select()
      .from(financialGoals)
      .where(eq(financialGoals.id, id))
      .limit(1);

    return goal ? (goal as FinancialGoalEntity) : null;
  }

  async findByIdWithStats(id: string): Promise<FinancialGoalWithStats | null> {
    const [goal] = await drizzleClient
      .select()
      .from(financialGoals)
      .where(eq(financialGoals.id, id))
      .limit(1);

    if (!goal) return null;

    const percentualConcluido =
      goal.valorObjetivo > 0 ? (goal.valorAtual / goal.valorObjetivo) * 100 : 0;

    const valorRestante = Math.max(0, goal.valorObjetivo - goal.valorAtual);

    return {
      ...goal,
      percentualConcluido: Math.round(percentualConcluido * 100) / 100,
      valorRestante,
    } as FinancialGoalWithStats;
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ goals: FinancialGoalEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const goals = await drizzleClient
      .select()
      .from(financialGoals)
      .where(eq(financialGoals.userId, userId))
      .orderBy(desc(financialGoals.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(financialGoals)
      .where(eq(financialGoals.userId, userId));

    return {
      goals: goals as FinancialGoalEntity[],
      total: Number(count),
    };
  }

  async findByUserIdWithStats(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ goals: FinancialGoalWithStats[]; total: number }> {
    const { goals, total } = await this.findByUserId(userId, page, limit);

    const goalsWithStats = goals.map((goal) => {
      const percentualConcluido =
        goal.valorObjetivo > 0
          ? (goal.valorAtual / goal.valorObjetivo) * 100
          : 0;

      const valorRestante = Math.max(0, goal.valorObjetivo - goal.valorAtual);

      return {
        ...goal,
        percentualConcluido: Math.round(percentualConcluido * 100) / 100,
        valorRestante,
      } as FinancialGoalWithStats;
    });

    return { goals: goalsWithStats, total };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ goals: FinancialGoalEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const goals = await drizzleClient
      .select()
      .from(financialGoals)
      .orderBy(desc(financialGoals.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(financialGoals);

    return {
      goals: goals as FinancialGoalEntity[],
      total: Number(count),
    };
  }

  async update(
    id: string,
    data: UpdateFinancialGoalDTO,
  ): Promise<FinancialGoalEntity> {
    const [goal] = await drizzleClient
      .update(financialGoals)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(financialGoals.id, id))
      .returning();

    if (!goal) {
      throw new NotFoundError('Financial Goal not found');
    }

    return goal as FinancialGoalEntity;
  }

  async delete(id: string): Promise<void> {
    const result = await drizzleClient
      .delete(financialGoals)
      .where(eq(financialGoals.id, id))
      .returning({ id: financialGoals.id });

    if (result.length === 0) {
      throw new NotFoundError('Financial Goal not found');
    }
  }

  async addTransaction(goalId: string, transactionId: string): Promise<void> {
    await drizzleClient.insert(financialGoalTransactions).values({
      financialGoalId: goalId,
      transactionId,
    });
  }

  async removeTransaction(
    goalId: string,
    transactionId: string,
  ): Promise<void> {
    const result = await drizzleClient
      .delete(financialGoalTransactions)
      .where(
        and(
          eq(financialGoalTransactions.financialGoalId, goalId),
          eq(financialGoalTransactions.transactionId, transactionId),
        ),
      )
      .returning();

    if (result.length === 0) {
      throw new NotFoundError('Financial Goal or Transaction not found');
    }
  }

  async updateValorAtual(goalId: string, valor: number): Promise<void> {
    const result = await drizzleClient
      .update(financialGoals)
      .set({
        valorAtual: valor,
        updatedAt: new Date(),
      })
      .where(eq(financialGoals.id, goalId))
      .returning({ id: financialGoals.id });

    if (result.length === 0) {
      throw new NotFoundError('Financial Goal not found');
    }
  }
}
