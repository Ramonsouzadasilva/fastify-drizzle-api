import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetGoalsStatsUseCase } from './get-goals-stats.use-case';
import { GoalStatus } from '../../../domain/entities/goal.entity';
import { TaskPriority, TaskStatus } from '../../../domain/entities/task.entity';
import { prisma } from '../../../infrastructure/database/drizzle-client';

vi.mock('../../../infrastructure/database/prisma-client', () => ({
  prisma: {
    goal: { findMany: vi.fn() },
    task: { findMany: vi.fn() },
  },
}));

describe('GetGoalsStatsUseCase', () => {
  let sut: GetGoalsStatsUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new GetGoalsStatsUseCase({} as any); // Repo não é usado aqui
  });

  it('deve calcular stats com userId', async () => {
    const userId = 'user-1';

    prisma.goal.findMany.mockResolvedValue([
      { status: GoalStatus.CONCLUIDA },
      { status: GoalStatus.PENDENTE },
    ]);

    prisma.task.findMany.mockResolvedValue([
      { status: TaskStatus.CONCLUIDA, prioridade: TaskPriority.ALTA },
      { status: TaskStatus.PENDENTE, prioridade: TaskPriority.MEDIA },
      { status: TaskStatus.PENDENTE, prioridade: TaskPriority.BAIXA },
    ]);

    const result = await sut.execute(userId);

    expect(prisma.goal.findMany).toHaveBeenCalledWith({ where: { userId } });
    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { userId } });

    expect(result).toEqual({
      totalMetas: 2,
      metasCompletadas: 1,
      metasPendentes: 1,
      percentualCompletadas: 50,
      totalDeTarefas: 3,
      tarefasCompletadas: 1,
      tarefasPendentes: 2,
      percentualTarefasCompletadas: 33,
      tarefasRestantes: 2,
      tarefasPorPrioridade: {
        alta: 1,
        media: 1,
        baixa: 1,
      },
    });
  });

  it('deve aplicar filtros vazios quando não há userId', async () => {
    prisma.goal.findMany.mockResolvedValue([]);
    prisma.task.findMany.mockResolvedValue([]);

    const result = await sut.execute();

    expect(prisma.goal.findMany).toHaveBeenCalledWith({ where: {} });
    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: {} });

    expect(result).toEqual({
      totalMetas: 0,
      metasCompletadas: 0,
      metasPendentes: 0,
      percentualCompletadas: 0,
      totalDeTarefas: 0,
      tarefasCompletadas: 0,
      tarefasPendentes: 0,
      percentualTarefasCompletadas: 0,
      tarefasRestantes: 0,
      tarefasPorPrioridade: {
        alta: 0,
        media: 0,
        baixa: 0,
      },
    });
  });
});
