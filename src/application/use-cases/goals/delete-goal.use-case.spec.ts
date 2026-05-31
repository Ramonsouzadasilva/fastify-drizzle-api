import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import { DeleteGoalUseCase } from './delete-goal.use-case';

describe('DeleteGoalUseCase', () => {
  const goalRepository = {
    findById: vi.fn(),
    delete: vi.fn(),
  };

  let sut: DeleteGoalUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new DeleteGoalUseCase(goalRepository as any);
  });

  it('deve deletar uma goal com sucesso', async () => {
    goalRepository.findById.mockResolvedValue({ id: 'goal-1' });

    await sut.execute('goal-1');

    expect(goalRepository.findById).toHaveBeenCalledWith('goal-1');
    expect(goalRepository.delete).toHaveBeenCalledWith('goal-1');
  });

  it('deve lançar NotFoundError se a goal não existir', async () => {
    goalRepository.findById.mockResolvedValue(null);

    await expect(sut.execute('goal-404')).rejects.toBeInstanceOf(NotFoundError);

    expect(goalRepository.delete).not.toHaveBeenCalled();
  });
});
