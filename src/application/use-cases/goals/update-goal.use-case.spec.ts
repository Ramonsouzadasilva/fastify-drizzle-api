import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { UpdateGoalUseCase } from './update-goal.use-case';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import {
  GoalStatus,
  type GoalEntity,
  type UpdateGoalDTO,
} from '../../../domain/entities/goal.entity';
import { GoalRepository } from '../../../domain/repositories/goal.repository';

describe('UpdateGoalUseCase', () => {
  let sut: UpdateGoalUseCase;
  let goalRepository: GoalRepository & {
    findById: Mock;
    update: Mock;
  };

  beforeEach(() => {
    goalRepository = {
      findById: vi.fn(),
      update: vi.fn(),
    } as any;

    sut = new UpdateGoalUseCase(goalRepository);
  });

  it('deve atualizar a goal quando existir', async () => {
    const id = 'goal-123';

    const data: UpdateGoalDTO = {
      title: 'Nova meta',
      description: 'Descrição atualizada',
      status: GoalStatus.EM_ANDAMENTO,
    };

    const goalExistente: GoalEntity = {
      id,
      title: 'Meta antiga',
      description: 'Desc antiga',
      inicio: new Date(),
      prazo: new Date(),
      status: GoalStatus.PENDENTE,
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const goalAtualizada: GoalEntity = {
      ...goalExistente,
      ...data,
      updatedAt: new Date(),
    };

    goalRepository.findById.mockResolvedValue(goalExistente);
    goalRepository.update.mockResolvedValue(goalAtualizada);

    const result = await sut.execute(id, data);

    expect(goalRepository.findById).toHaveBeenCalledWith(id);
    expect(goalRepository.update).toHaveBeenCalledWith(id, data);
    expect(result).toEqual(goalAtualizada);
  });

  it('deve lançar NotFoundError se a goal não existir', async () => {
    goalRepository.findById.mockResolvedValue(null);

    await expect(
      sut.execute('goal-inexistente', { title: 'qualquer' }),
    ).rejects.toThrow(NotFoundError);

    expect(goalRepository.update).not.toHaveBeenCalled();
  });
});
