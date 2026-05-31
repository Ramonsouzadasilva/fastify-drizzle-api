import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllGoalsUseCase } from './get-all-goals.use-case';
import type { GoalWithStats } from '../../../domain/entities/goal.entity';

describe('GetAllGoalsUseCase', () => {
  const goalRepository = {
    findByUserIdWithStats: vi.fn(),
    findAll: vi.fn(),
    findByIdWithStats: vi.fn(),
  };

  let sut: GetAllGoalsUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new GetAllGoalsUseCase(goalRepository as any);
  });

  it('deve retornar goals com stats para um usuário específico', async () => {
    const userId = 'user-123';
    const page = 1;
    const limit = 10;

    const response = {
      goals: [
        {
          id: 'goal-1',
          tarefasTotal: 5,
          tarefasCompletadas: 2,
          tarefasRestantes: 3,
          tarefasPercentual: 40,
        },
        {
          id: 'goal-2',
          tarefasTotal: 10,
          tarefasCompletadas: 7,
          tarefasRestantes: 3,
          tarefasPercentual: 70,
        },
      ] as GoalWithStats[],
      total: 2,
    };

    goalRepository.findByUserIdWithStats.mockResolvedValue(response);

    const result = await sut.execute(page, limit, userId);

    expect(goalRepository.findByUserIdWithStats).toHaveBeenCalledWith(
      userId,
      page,
      limit,
    );
    expect(result).toEqual(response);
  });

  it('deve retornar goals com stats para admin quando não há userId', async () => {
    const page = 1;
    const limit = 10;

    goalRepository.findAll.mockResolvedValue({
      goals: [{ id: 'goal-1' }, { id: 'goal-2' }],
      total: 2,
    });

    goalRepository.findByIdWithStats
      .mockResolvedValueOnce({
        id: 'goal-1',
        tarefasTotal: 5,
        tarefasCompletadas: 2,
        tarefasRestantes: 3,
        tarefasPercentual: 40,
      })
      .mockResolvedValueOnce({
        id: 'goal-2',
        tarefasTotal: 10,
        tarefasCompletadas: 7,
        tarefasRestantes: 3,
        tarefasPercentual: 70,
      });

    const result = await sut.execute(page, limit);

    expect(goalRepository.findAll).toHaveBeenCalledWith(page, limit);
    expect(goalRepository.findByIdWithStats).toHaveBeenCalledTimes(2);
    expect(goalRepository.findByIdWithStats).toHaveBeenCalledWith('goal-1');
    expect(goalRepository.findByIdWithStats).toHaveBeenCalledWith('goal-2');

    expect(result).toEqual({
      goals: [
        {
          id: 'goal-1',
          tarefasTotal: 5,
          tarefasCompletadas: 2,
          tarefasRestantes: 3,
          tarefasPercentual: 40,
        },
        {
          id: 'goal-2',
          tarefasTotal: 10,
          tarefasCompletadas: 7,
          tarefasRestantes: 3,
          tarefasPercentual: 70,
        },
      ],
      total: 2,
    });
  });
});
