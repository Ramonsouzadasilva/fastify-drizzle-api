import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { RemoveTaskFromGoalUseCase } from './remove-task-from-goal.use-case';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import type { GoalRepository } from '../../../domain/repositories/goal.repository';

describe('RemoveTaskFromGoalUseCase', () => {
  let goalRepository: GoalRepository;
  let sut: RemoveTaskFromGoalUseCase;

  beforeEach(() => {
    goalRepository = {
      findById: vi.fn(),
      removeTask: vi.fn(),
    } as any;

    sut = new RemoveTaskFromGoalUseCase(goalRepository);
  });

  it('deve remover uma task de uma goal existente', async () => {
    // goalRepository.findById.mockResolvedValue({ id: 'goal-123' });
    (goalRepository.findById as Mock).mockResolvedValue({ id: 'goal-123' });

    await sut.execute('goal-123', 'task-999');

    expect(goalRepository.findById).toHaveBeenCalledWith('goal-123');
    expect(goalRepository.removeTask).toHaveBeenCalledWith(
      'goal-123',
      'task-999',
    );
  });

  it('deve lançar erro se a goal não existir', async () => {
    (goalRepository.findById as Mock).mockResolvedValue(null);

    await expect(sut.execute('goal-inexistente', 'task-321')).rejects.toThrow(
      NotFoundError,
    );

    expect(goalRepository.removeTask).not.toHaveBeenCalled();
  });
});
