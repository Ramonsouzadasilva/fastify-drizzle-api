import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetGoalByIdUseCase } from './get-goal-by-id.use-case';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import type { GoalWithStats } from '../../../domain/entities/goal.entity';

describe('GetGoalByIdUseCase', () => {
  const goalRepository = {
    findByIdWithStats: vi.fn(),
  };

  let sut: GetGoalByIdUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new GetGoalByIdUseCase(goalRepository as any);
  });

  it('deve retornar uma goal com stats quando existir', async () => {
    const id = 'goal-123';

    const goal: GoalWithStats = {
      id,
      title: 'Meta 1',
      userId: 'user-1',
      inicio: new Date(),
      prazo: new Date(),
      status: 'PENDENTE' as any,
      createdAt: new Date(),
      updatedAt: new Date(),
      tarefasCompletadas: 2,
      tarefasTotal: 5,
      tarefasRestantes: 3,
      tarefasPercentual: 40,
    };

    goalRepository.findByIdWithStats.mockResolvedValue(goal);

    const result = await sut.execute(id);

    expect(goalRepository.findByIdWithStats).toHaveBeenCalledWith(id);
    expect(result).toEqual(goal);
  });

  it('deve lançar NotFoundError quando goal não existir', async () => {
    const id = 'goal-999';

    goalRepository.findByIdWithStats.mockResolvedValue(null);

    await expect(sut.execute(id)).rejects.toThrow(NotFoundError);
    expect(goalRepository.findByIdWithStats).toHaveBeenCalledWith(id);
  });
});
