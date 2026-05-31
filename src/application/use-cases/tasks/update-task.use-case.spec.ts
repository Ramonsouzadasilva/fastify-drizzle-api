import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UpdateTaskUseCase } from './update-task.use-case';
import type { TaskRepository } from '../../../domain/repositories/task.repository';
import type {
  TaskEntity,
  UpdateTaskDTO,
} from '../../../domain/entities/task.entity';
import { NotFoundError } from '../../../shared/errors/not-found-error';

describe('UpdateTaskUseCase', () => {
  let taskRepository: TaskRepository;
  let useCase: UpdateTaskUseCase;

  const existingTask: TaskEntity = {
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

  const updateData: UpdateTaskDTO = {
    title: 'Comprar pão integral',
    status: 'CONCLUIDA' as any,
  };

  const updatedTask: TaskEntity = {
    ...existingTask,
    ...updateData,
    updatedAt: new Date(),
  };

  beforeEach(() => {
    taskRepository = {
      findById: vi.fn(),
      update: vi.fn(),

      // mocks completos (pro TS não encher)
      findAll: vi.fn(),
      findByUserId: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    } as TaskRepository;

    useCase = new UpdateTaskUseCase(taskRepository);
  });

  it('should update a task successfully', async () => {
    (taskRepository.findById as any).mockResolvedValue(existingTask);
    (taskRepository.update as any).mockResolvedValue(updatedTask);

    const result = await useCase.execute('task-1', updateData);

    expect(taskRepository.findById).toHaveBeenCalledWith('task-1');
    expect(taskRepository.update).toHaveBeenCalledWith('task-1', updateData);
    expect(result).toEqual(updatedTask);
  });

  it('should throw NotFoundError if task does not exist', async () => {
    (taskRepository.findById as any).mockResolvedValue(null);

    await expect(useCase.execute('task-999', updateData)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should propagate repository errors', async () => {
    (taskRepository.findById as any).mockResolvedValue(existingTask);
    (taskRepository.update as any).mockRejectedValue(new Error('db error'));

    await expect(useCase.execute('task-1', updateData)).rejects.toThrow(
      'db error',
    );
  });
});
