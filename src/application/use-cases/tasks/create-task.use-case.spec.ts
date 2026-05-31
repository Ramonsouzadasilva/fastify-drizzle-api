import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTaskUseCase } from './create-task.use-case';
import type { TaskRepository } from '../../../domain/repositories/task.repository';
import type {
  CreateTaskDTO,
  TaskEntity,
} from '../../../domain/entities/task.entity';

describe('CreateTaskUseCase', () => {
  const taskRepositoryMock = {
    create: vi.fn(),
  } as unknown as TaskRepository;

  const useCase = new CreateTaskUseCase(taskRepositoryMock);

  const input: CreateTaskDTO = {
    title: 'Comprar pão',
    description: 'Ir na padaria',
    inicio: new Date('2025-01-10'),
    prazo: new Date('2025-01-11'),
    status: 'PENDENTE' as any,
    prioridade: 'BAIXA' as any,
    userId: 'user-1',
  };

  const createdTask: TaskEntity = {
    id: 'task-123',
    ...input,
    status: input.status!,
    prioridade: input.prioridade!,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a task successfully', async () => {
    taskRepositoryMock.create = vi.fn().mockResolvedValue(createdTask);

    const result = await useCase.execute(input);

    expect(taskRepositoryMock.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(createdTask);
  });

  it('should propagate repository errors', async () => {
    taskRepositoryMock.create = vi
      .fn()
      .mockRejectedValue(new Error('db error'));

    await expect(useCase.execute(input)).rejects.toThrow('db error');
  });
});
