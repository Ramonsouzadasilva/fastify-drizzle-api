import type { FinancialGoalRepository } from '../../../domain/repositories/financial-goal.repository';
import { FinancialGoalStatus } from '../../../domain/entities/financial-goal.entity';
import { TransactionType } from '../../../domain/entities/transaction.entity';
import { prisma } from '../../../infrastructure/database/drizzle-client';

interface FinancialGoalsStats {
  totalMetas: number;
  metasCompletadas: number;
  metasPendentes: number;
  percentualCompletadas: number;
  tipoDeTransacoes: {
    receita: number;
    despesa: number;
  };
  totalTransacoes: number;
  percentualReceitas: number;
  percentualDespesas: number;
}

export class GetFinancialGoalsStatsUseCase {
  constructor(
    private readonly financialGoalRepository: FinancialGoalRepository,
  ) {}

  async execute(userId?: string): Promise<FinancialGoalsStats> {
    const whereClause = userId ? { userId } : {};

    const [goals, transactions] = await Promise.all([
      prisma.financialGoal.findMany({ where: whereClause }),
      prisma.transaction.findMany({ where: whereClause }),
    ]);

    const totalMetas = goals.length;
    const metasCompletadas = goals.filter(
      (g) => g.status === FinancialGoalStatus.CONCLUIDA,
    ).length;
    const metasPendentes = goals.filter(
      (g) => g.status !== FinancialGoalStatus.CONCLUIDA,
    ).length;
    const percentualCompletadas =
      totalMetas > 0 ? Math.round((metasCompletadas / totalMetas) * 100) : 0;

    const totalTransacoes = transactions.length;
    const receitas = transactions.filter(
      (t) => t.tipo === TransactionType.RECEITA,
    ).length;
    const despesas = transactions.filter(
      (t) => t.tipo === TransactionType.DESPESA,
    ).length;
    const percentualReceitas =
      totalTransacoes > 0 ? Math.round((receitas / totalTransacoes) * 100) : 0;
    const percentualDespesas =
      totalTransacoes > 0 ? Math.round((despesas / totalTransacoes) * 100) : 0;

    return {
      totalMetas,
      metasCompletadas,
      metasPendentes,
      percentualCompletadas,
      tipoDeTransacoes: {
        receita: receitas,
        despesa: despesas,
      },
      totalTransacoes,
      percentualReceitas,
      percentualDespesas,
    };
  }
}
