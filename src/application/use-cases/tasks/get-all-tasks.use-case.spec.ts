import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllTasksUseCase } from './get-all-tasks.use-case';
import type { TaskRepository } from '../../../domain/repositories/task.repository';
import type { TaskEntity } from '../../../domain/entities/task.entity';

describe('GetAllTasksUseCase', () => {
  let taskRepository: TaskRepository;
  let useCase: GetAllTasksUseCase;

  const tasksMock: TaskEntity[] = [
    {
      id: '1',
      title: 'Task 1',
      inicio: new Date(),
      prazo: new Date(),
      status: 'PENDENTE' as any,
      prioridade: 'MEDIA' as any,
      userId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    taskRepository = {
      findAll: vi.fn(),
      findByUserId: vi.fn(),

      create: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    } as TaskRepository;

    useCase = new GetAllTasksUseCase(taskRepository);
  });

  it('should get all tasks when no userId is provided', async () => {
    (taskRepository.findAll as any).mockResolvedValue({
      tasks: tasksMock,
      total: 1,
    });

    const result = await useCase.execute(1, 10);

    expect(taskRepository.findAll).toHaveBeenCalledWith(1, 10);
    expect(result).toEqual({
      tasks: tasksMock,
      total: 1,
    });
  });

  it('should get tasks filtered by userId', async () => {
    (taskRepository.findByUserId as any).mockResolvedValue({
      tasks: tasksMock,
      total: 1,
    });

    const result = await useCase.execute(1, 10, 'user-1');

    expect(taskRepository.findByUserId).toHaveBeenCalledWith('user-1', 1, 10);
    expect(result).toEqual({
      tasks: tasksMock,
      total: 1,
    });
  });

  it('should propagate repository errors', async () => {
    (taskRepository.findAll as any).mockRejectedValue(new Error('db error'));

    await expect(useCase.execute(1, 10)).rejects.toThrow('db error');
  });
});
