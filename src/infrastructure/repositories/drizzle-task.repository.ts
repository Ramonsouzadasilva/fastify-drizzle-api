import type { TaskRepository } from '../../domain/repositories/task.repository';
import type {
  CreateTaskDTO,
  TaskEntity,
  UpdateTaskDTO,
} from '../../domain/entities/task.entity';

import { drizzleClient } from '../database/drizzle-client';
import { tasks } from '../drizzle/schema';

import { eq, desc, sql } from 'drizzle-orm';
import { NotFoundError } from '../../shared/errors/not-found-error';

export class DrizzleTaskRepository implements TaskRepository {
  async create(data: CreateTaskDTO): Promise<TaskEntity> {
    const [task] = await drizzleClient
      .insert(tasks)
      .values({
        title: data.title,
        description: data.description,
        inicio: data.inicio,
        prazo: data.prazo,
        status: data.status,
        prioridade: data.prioridade,
        userId: data.userId,
      })
      .returning();

    return task as TaskEntity;
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const [task] = await drizzleClient
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));

    return (task as TaskEntity) ?? null;
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ tasks: TaskEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const tasksList = await drizzleClient
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(desc(tasks.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(tasks)
      .where(eq(tasks.userId, userId));

    return { tasks: tasksList as TaskEntity[], total: count };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ tasks: TaskEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const tasksList = await drizzleClient
      .select()
      .from(tasks)
      .orderBy(desc(tasks.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({ count: sql<number>`count(*)` })
      .from(tasks);

    return { tasks: tasksList as TaskEntity[], total: count };
  }

  async update(id: string, data: UpdateTaskDTO): Promise<TaskEntity> {
    const [task] = await drizzleClient
      .update(tasks)
      .set(data)
      .where(eq(tasks.id, id))
      .returning();

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    return task as TaskEntity;
  }

  async delete(id: string): Promise<void> {
    const result = await drizzleClient.delete(tasks).where(eq(tasks.id, id));

    if (!result.rowCount) {
      throw new NotFoundError('Task not found');
    }
  }
}
