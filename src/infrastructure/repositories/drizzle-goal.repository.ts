import type { GoalRepository } from '../../domain/repositories/goal.repository';
import type {
  CreateGoalDTO,
  GoalEntity,
  GoalWithStats,
  UpdateGoalDTO,
} from '../../domain/entities/goal.entity';

import { drizzleClient } from '../database/drizzle-client';
import { goals, tasks, taskGoals } from '../drizzle/schema';

import { eq, desc, sql, and } from 'drizzle-orm';
import { NotFoundError } from '../../shared/errors/not-found-error';
import { TaskStatus } from '../../domain/entities/task.entity';

export class DrizzleGoalRepository implements GoalRepository {
  async create(data: CreateGoalDTO): Promise<GoalEntity> {
    const [goal] = await drizzleClient
      .insert(goals)
      .values({
        title: data.title,
        description: data.description,
        inicio: data.inicio,
        prazo: data.prazo,
        status: data.status,
        userId: data.userId,
      })
      .returning();

    if (data.tarefas?.length) {
      await drizzleClient.insert(taskGoals).values(
        data.tarefas.map((taskId) => ({
          goalId: goal.id,
          taskId,
        })),
      );
    }

    return goal as GoalEntity;
  }

  async findById(id: string): Promise<GoalEntity | null> {
    const [goal] = await drizzleClient
      .select()
      .from(goals)
      .where(eq(goals.id, id));

    return (goal as GoalEntity) ?? null;
  }

  async findByIdWithStats(id: string): Promise<GoalWithStats | null> {
    const goal = await this.findById(id);
    if (!goal) return null;

    const goalTasks = await drizzleClient
      .select()
      .from(tasks)
      .innerJoin(taskGoals, eq(taskGoals.taskId, tasks.id))
      .where(eq(taskGoals.goalId, id));

    const tarefasTotal = goalTasks.length;
    const tarefasCompletadas = goalTasks.filter(
      ({ tasks }) => tasks.status === TaskStatus.CONCLUIDA,
    ).length;

    const tarefasPercentual =
      tarefasTotal > 0
        ? Math.round((tarefasCompletadas / tarefasTotal) * 100)
        : 0;

    const tarefasRestantes = tarefasTotal - tarefasCompletadas;

    return {
      ...goal,
      tarefasCompletadas,
      tarefasTotal,
      tarefasPercentual,
      tarefasRestantes,
    } as GoalWithStats;
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ goals: GoalEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const goalsList = await drizzleClient
      .select()
      .from(goals)
      .where(eq(goals.userId, userId))
      .orderBy(desc(goals.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(goals)
      .where(eq(goals.userId, userId));

    return { goals: goalsList as GoalEntity[], total: count };
  }

  async findByUserIdWithStats(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ goals: GoalWithStats[]; total: number }> {
    const offset = (page - 1) * limit;

    const goalsList = await drizzleClient
      .select()
      .from(goals)
      .where(eq(goals.userId, userId))
      .orderBy(desc(goals.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(goals)
      .where(eq(goals.userId, userId));

    const goalsWithStats: GoalWithStats[] = [];

    for (const goal of goalsList) {
      const goalTasks = await drizzleClient
        .select()
        .from(tasks)
        .innerJoin(taskGoals, eq(taskGoals.taskId, tasks.id))
        .where(eq(taskGoals.goalId, goal.id));

      const tarefasTotal = goalTasks.length;
      const tarefasCompletadas = goalTasks.filter(
        ({ tasks }) => tasks.status === TaskStatus.CONCLUIDA,
      ).length;

      const tarefasPercentual =
        tarefasTotal > 0
          ? Math.round((tarefasCompletadas / tarefasTotal) * 100)
          : 0;

      goalsWithStats.push({
        ...goal,
        tarefasTotal,
        tarefasCompletadas,
        tarefasPercentual,
        tarefasRestantes: tarefasTotal - tarefasCompletadas,
      } as GoalWithStats);
    }

    return { goals: goalsWithStats, total: count };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ goals: GoalEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const goalsList = await drizzleClient
      .select()
      .from(goals)
      .orderBy(desc(goals.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(goals);

    return { goals: goalsList as GoalEntity[], total: count };
  }

  async update(id: string, data: UpdateGoalDTO): Promise<GoalEntity> {
    const [goal] = await drizzleClient
      .update(goals)
      .set(data)
      .where(eq(goals.id, id))
      .returning();

    if (!goal) throw new NotFoundError('Goal not found');

    return goal as GoalEntity;
  }

  async delete(id: string): Promise<void> {
    const result = await drizzleClient.delete(goals).where(eq(goals.id, id));

    if (!result.rowCount) {
      throw new NotFoundError('Goal not found');
    }
  }

  async addTask(goalId: string, taskId: string): Promise<void> {
    await drizzleClient.insert(taskGoals).values({
      goalId,
      taskId,
    });
  }

  async removeTask(goalId: string, taskId: string): Promise<void> {
    const result = await drizzleClient
      .delete(taskGoals)
      .where(and(eq(taskGoals.goalId, goalId), eq(taskGoals.taskId, taskId)));

    if (!result.rowCount) {
      throw new NotFoundError('Goal or Task not found');
    }
  }
}
