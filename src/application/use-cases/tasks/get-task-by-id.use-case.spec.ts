import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetTaskByIdUseCase } from './get-task-by-id.use-case';
import type { TaskRepository } from '../../../domain/repositories/task.repository';
import type { TaskEntity } from '../../../domain/entities/task.entity';
import { NotFoundError } from '../../../shared/errors/not-found-error';

describe('GetTaskByIdUseCase', () => {
  let taskRepository: TaskRepository;
  let useCase: GetTaskByIdUseCase;

  const taskMock: TaskEntity = {
    id: 'task-1',
    title: 'Comprar pão',
    inicio: new Date(),
    prazo: new Date(),
    status: 'PENDENTE' as any,
    prioridade: 'MEDIA' as any,
    userId: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    taskRepository = {
      findById: vi.fn(),

      // completos para TS
      findAll: vi.fn(),
      findByUserId: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    } as TaskRepository;

    useCase = new GetTaskByIdUseCase(taskRepository);
  });

  it('should return a task when found', async () => {
    (taskRepository.findById as any).mockResolvedValue(taskMock);

    const result = await useCase.execute('task-1');

    expect(taskRepository.findById).toHaveBeenCalledWith('task-1');
    expect(result).toEqual(taskMock);
  });

  it('should throw NotFoundError when task does not exist', async () => {
    (taskRepository.findById as any).mockResolvedValue(null);

    await expect(useCase.execute('unknown')).rejects.toThrow(NotFoundError);
  });

  it('should propagate repository errors', async () => {
    (taskRepository.findById as any).mockRejectedValue(new Error('db error'));

    await expect(useCase.execute('task-1')).rejects.toThrow('db error');
  });
});
