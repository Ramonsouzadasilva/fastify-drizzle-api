import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import { AddTaskToGoalUseCase } from './add-task-to-goal.use-case';

describe('AddTaskToGoalUseCase', () => {
  const goalRepository = {
    findById: vi.fn(),
    addTask: vi.fn(),
  };

  const taskRepository = {
    findById: vi.fn(),
  };

  let sut: AddTaskToGoalUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new AddTaskToGoalUseCase(
      goalRepository as any,
      taskRepository as any,
    );
  });

  it('deve adicionar uma task a uma goal com sucesso', async () => {
    goalRepository.findById.mockResolvedValue({ id: 'goal-1' });
    taskRepository.findById.mockResolvedValue({ id: 'task-1' });

    await sut.execute('goal-1', 'task-1');

    expect(goalRepository.addTask).toHaveBeenCalledWith('goal-1', 'task-1');
  });

  it('deve lançar erro se a goal não existir', async () => {
    goalRepository.findById.mockResolvedValue(null);

    await expect(sut.execute('goal-1', 'task-1')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('deve lançar erro se a task não existir', async () => {
    goalRepository.findById.mockResolvedValue({ id: 'goal-1' });
    taskRepository.findById.mockResolvedValue(null);

    await expect(sut.execute('goal-1', 'task-1')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
