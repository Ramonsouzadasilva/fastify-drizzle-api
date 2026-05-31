import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware';
import type { CreateFinancialGoalUseCase } from '../../application/use-cases/financial-goals/create-financial-goal.use-case';
import type { GetAllFinancialGoalsUseCase } from '../../application/use-cases/financial-goals/get-all-financial-goals.use-case';
import type { GetFinancialGoalByIdUseCase } from '../../application/use-cases/financial-goals/get-financial-goal-by-id.use-case';
import type { UpdateFinancialGoalUseCase } from '../../application/use-cases/financial-goals/update-financial-goal.use-case';
import type { DeleteFinancialGoalUseCase } from '../../application/use-cases/financial-goals/delete-financial-goal.use-case';
import type { AddTransactionToFinancialGoalUseCase } from '../../application/use-cases/financial-goals/add-transaction-to-goal.use-case';
import type { RemoveTransactionFromFinancialGoalUseCase } from '../../application/use-cases/financial-goals/remove-transaction-from-goal.use-case';
import type { GetFinancialGoalsStatsUseCase } from '../../application/use-cases/financial-goals/get-financial-goals-stats.use-case';
import {
  createPaginatedResponse,
  parsePaginationParams,
} from '../../shared/utils/pagination';

export class FinancialGoalController {
  constructor(
    private readonly createFinancialGoalUseCase: CreateFinancialGoalUseCase,
    private readonly getAllFinancialGoalsUseCase: GetAllFinancialGoalsUseCase,
    private readonly getFinancialGoalByIdUseCase: GetFinancialGoalByIdUseCase,
    private readonly updateFinancialGoalUseCase: UpdateFinancialGoalUseCase,
    private readonly deleteFinancialGoalUseCase: DeleteFinancialGoalUseCase,
    private readonly addTransactionToFinancialGoalUseCase: AddTransactionToFinancialGoalUseCase,
    private readonly removeTransactionFromFinancialGoalUseCase: RemoveTransactionFromFinancialGoalUseCase,
    private readonly getFinancialGoalsStatsUseCase: GetFinancialGoalsStatsUseCase,
  ) {}

  async create(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const goal = await this.createFinancialGoalUseCase.execute({
        ...req.body,
        inicio: new Date(req.body.inicio),
        prazo: new Date(req.body.prazo),
        userId: req.user!.userId,
      });

      res.status(201).json({
        status: 'success',
        data: { goal },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { page, limit } = parsePaginationParams(
        req.query.page as string,
        req.query.limit as string,
      );
      const userId = req.user!.role === 'ADMIN' ? undefined : req.user!.userId;
      const { goals, total } = await this.getAllFinancialGoalsUseCase.execute(
        page,
        limit,
        userId,
      );

      res.status(200).json({
        status: 'success',
        ...createPaginatedResponse(goals, total, page, limit),
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const goal = await this.getFinancialGoalByIdUseCase.execute(
        req.params.id,
      );

      res.status(200).json({
        status: 'success',
        data: { goal },
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const updateData: any = { ...req.body };
      if (req.body.inicio) updateData.inicio = new Date(req.body.inicio);
      if (req.body.prazo) updateData.prazo = new Date(req.body.prazo);

      const goal = await this.updateFinancialGoalUseCase.execute(
        req.params.id,
        updateData,
      );

      res.status(200).json({
        status: 'success',
        data: { goal },
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.deleteFinancialGoalUseCase.execute(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async addTransaction(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.addTransactionToFinancialGoalUseCase.execute(
        req.params.id,
        req.body.transactionId,
      );

      res.status(200).json({
        status: 'success',
        message: 'Transaction added to financial goal successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async removeTransaction(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.removeTransactionFromFinancialGoalUseCase.execute(
        req.params.id,
        req.body.transactionId,
      );

      res.status(200).json({
        status: 'success',
        message: 'Transaction removed from financial goal successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getStats(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user!.role === 'ADMIN' ? undefined : req.user!.userId;
      const stats = await this.getFinancialGoalsStatsUseCase.execute(userId);

      res.status(200).json({
        status: 'success',
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}
