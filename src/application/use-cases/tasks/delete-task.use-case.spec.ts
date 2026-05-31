import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import type { TaskRepository } from '../../../domain/repositories/task.repository';
import { DeleteTaskUseCase } from './delete-task.use-case';

describe('DeleteTaskUseCase', () => {
  let taskRepository: TaskRepository;
  let deleteTaskUseCase: DeleteTaskUseCase;

  beforeEach(() => {
    taskRepository = {
      findById: vi.fn(),
      delete: vi.fn(),

      create: vi.fn(),
      findByUserId: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
    } as TaskRepository;

    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  });

  it('should delete a task successfully', async () => {
    const taskId = '123';

    vi.mocked(taskRepository.findById).mockResolvedValue({ id: taskId } as any);
    vi.mocked(taskRepository.delete).mockResolvedValue();

    await expect(deleteTaskUseCase.execute(taskId)).resolves.toBeUndefined();

    expect(taskRepository.findById).toHaveBeenCalledWith(taskId);
    expect(taskRepository.delete).toHaveBeenCalledWith(taskId);
  });

  it('should throw NotFoundError when task does not exist', async () => {
    const taskId = 'not-exists';

    vi.mocked(taskRepository.findById).mockResolvedValue(null);

    await expect(deleteTaskUseCase.execute(taskId)).rejects.toThrow(
      new NotFoundError('Task not found'),
    );

    expect(taskRepository.findById).toHaveBeenCalledWith(taskId);
    expect(taskRepository.delete).not.toHaveBeenCalled();
  });
});
