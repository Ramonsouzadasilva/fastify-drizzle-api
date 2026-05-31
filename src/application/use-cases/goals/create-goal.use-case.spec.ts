import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  CreateGoalDTO,
  GoalEntity,
} from '../../../domain/entities/goal.entity';
import { CreateGoalUseCase } from './create-goal.use-case';

describe('CreateGoalUseCase', () => {
  const goalRepository = {
    create: vi.fn(),
  };

  let sut: CreateGoalUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new CreateGoalUseCase(goalRepository as any);
  });

  it('deve criar uma goal com sucesso', async () => {
    const dto: CreateGoalDTO = {
      title: 'Estudar Go',
      description: 'Aprender Go e fazer projetos',
      inicio: new Date('2026-01-01'),
      prazo: new Date('2026-06-01'),
      status: 'PENDENTE' as any,
      userId: 'user-123',
      tarefas: ['task-1', 'task-2'],
    };

    const createdGoal: GoalEntity = {
      id: 'goal-1',
      title: dto.title,
      description: dto.description,
      inicio: dto.inicio,
      prazo: dto.prazo,
      status: dto.status!,
      userId: dto.userId,
      createdAt: new Date('2026-01-10'),
      updatedAt: new Date('2026-01-10'),
    };

    goalRepository.create.mockResolvedValue(createdGoal);

    const result = await sut.execute(dto);

    expect(goalRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(createdGoal);
  });
});
