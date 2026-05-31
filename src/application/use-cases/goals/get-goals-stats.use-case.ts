import type { GoalRepository } from '../../../domain/repositories/goal.repository';
import { GoalStatus } from '../../../domain/entities/goal.entity';
import { TaskPriority, TaskStatus } from '../../../domain/entities/task.entity';
import { prisma } from '../../../infrastructure/database/drizzle-client';

interface GoalsStats {
  totalMetas: number;
  metasCompletadas: number;
  metasPendentes: number;
  percentualCompletadas: number;
  totalDeTarefas: number;
  tarefasCompletadas: number;
  tarefasPendentes: number;
  percentualTarefasCompletadas: number;
  tarefasRestantes: number;
  tarefasPorPrioridade: {
    alta: number;
    media: number;
    baixa: number;
  };
}

export class GetGoalsStatsUseCase {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(userId?: string): Promise<GoalsStats> {
    const whereClause = userId ? { userId } : {};

    const [goals, tasks] = await Promise.all([
      prisma.goal.findMany({ where: whereClause }),
      prisma.task.findMany({ where: whereClause }),
    ]);

    const totalMetas = goals.length;
    const metasCompletadas = goals.filter(
      (g) => g.status === GoalStatus.CONCLUIDA,
    ).length;
    const metasPendentes = goals.filter(
      (g) => g.status !== GoalStatus.CONCLUIDA,
    ).length;
    const percentualCompletadas =
      totalMetas > 0 ? Math.round((metasCompletadas / totalMetas) * 100) : 0;

    const totalDeTarefas = tasks.length;
    const tarefasCompletadas = tasks.filter(
      (t) => t.status === TaskStatus.CONCLUIDA,
    ).length;
    const tarefasPendentes = tasks.filter(
      (t) => t.status !== TaskStatus.CONCLUIDA,
    ).length;
    const percentualTarefasCompletadas =
      totalDeTarefas > 0
        ? Math.round((tarefasCompletadas / totalDeTarefas) * 100)
        : 0;
    const tarefasRestantes = tarefasPendentes;

    const tarefasPorPrioridade = {
      alta: tasks.filter((t) => t.prioridade === TaskPriority.ALTA).length,
      media: tasks.filter((t) => t.prioridade === TaskPriority.MEDIA).length,
      baixa: tasks.filter((t) => t.prioridade === TaskPriority.BAIXA).length,
    };

    return {
      totalMetas,
      metasCompletadas,
      metasPendentes,
      percentualCompletadas,
      totalDeTarefas,
      tarefasCompletadas,
      tarefasPendentes,
      percentualTarefasCompletadas,
      tarefasRestantes,
      tarefasPorPrioridade,
    };
  }
}
