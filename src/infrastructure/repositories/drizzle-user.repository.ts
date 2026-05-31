import { eq, desc, sql } from 'drizzle-orm';

import type { UserRepository } from '../../domain/repositories/user.repository';
import type {
  CreateUserDTO,
  UpdateUserDTO,
  UserEntity,
} from '../../domain/entities/user.entity';

import { NotFoundError } from '../../shared/errors/not-found-error';
import { drizzleClient } from '../database/drizzle-client';
import { users } from '../drizzle/schema';

export class DrizzleUserRepository implements UserRepository {
  async create(data: CreateUserDTO): Promise<UserEntity> {
    const [user] = await drizzleClient
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      .returning();

    return user as UserEntity;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const [user] = await drizzleClient
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user ? (user as UserEntity) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const [user] = await drizzleClient
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user ? (user as UserEntity) : null;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ users: UserEntity[]; total: number }> {
    const offset = (page - 1) * limit;

    const usersResult = await drizzleClient
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await drizzleClient
      .select({
        count: sql<number>`count(*)`,
      })
      .from(users);

    return {
      users: usersResult as UserEntity[],
      total: Number(count),
    };
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    const [user] = await drizzleClient
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user as UserEntity;
  }

  async delete(id: string): Promise<void> {
    const result = await drizzleClient
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });

    if (result.length === 0) {
      throw new NotFoundError('User not found');
    }
  }
}
