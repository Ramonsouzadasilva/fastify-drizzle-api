import type { Response, NextFunction } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware"
import type { CreateGoalUseCase } from "../../application/use-cases/goals/create-goal.use-case"
import type { GetAllGoalsUseCase } from "../../application/use-cases/goals/get-all-goals.use-case"
import type { GetGoalByIdUseCase } from "../../application/use-cases/goals/get-goal-by-id.use-case"
import type { UpdateGoalUseCase } from "../../application/use-cases/goals/update-goal.use-case"
import type { DeleteGoalUseCase } from "../../application/use-cases/goals/delete-goal.use-case"
import type { AddTaskToGoalUseCase } from "../../application/use-cases/goals/add-task-to-goal.use-case"
import type { RemoveTaskFromGoalUseCase } from "../../application/use-cases/goals/remove-task-from-goal.use-case"
import type { GetGoalsStatsUseCase } from "../../application/use-cases/goals/get-goals-stats.use-case"
import { createPaginatedResponse, parsePaginationParams } from "../../shared/utils/pagination"

export class GoalController {
  constructor(
    private readonly createGoalUseCase: CreateGoalUseCase,
    private readonly getAllGoalsUseCase: GetAllGoalsUseCase,
    private readonly getGoalByIdUseCase: GetGoalByIdUseCase,
    private readonly updateGoalUseCase: UpdateGoalUseCase,
    private readonly deleteGoalUseCase: DeleteGoalUseCase,
    private readonly addTaskToGoalUseCase: AddTaskToGoalUseCase,
    private readonly removeTaskFromGoalUseCase: RemoveTaskFromGoalUseCase,
    private readonly getGoalsStatsUseCase: GetGoalsStatsUseCase,
  ) {}

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const goal = await this.createGoalUseCase.execute({
        ...req.body,
        inicio: new Date(req.body.inicio),
        prazo: new Date(req.body.prazo),
        userId: req.user!.userId,
      })

      res.status(201).json({
        status: "success",
        data: { goal },
      })
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit } = parsePaginationParams(req.query.page as string, req.query.limit as string)
      const userId = req.user!.role === "ADMIN" ? undefined : req.user!.userId
      const { goals, total } = await this.getAllGoalsUseCase.execute(page, limit, userId)

      res.status(200).json({
        status: "success",
        ...createPaginatedResponse(goals, total, page, limit),
      })
    } catch (error) {
      next(error)
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const goal = await this.getGoalByIdUseCase.execute(req.params.id)

      res.status(200).json({
        status: "success",
        data: { goal },
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updateData: any = { ...req.body }
      if (req.body.inicio) updateData.inicio = new Date(req.body.inicio)
      if (req.body.prazo) updateData.prazo = new Date(req.body.prazo)

      const goal = await this.updateGoalUseCase.execute(req.params.id, updateData)

      res.status(200).json({
        status: "success",
        data: { goal },
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteGoalUseCase.execute(req.params.id)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async addTask(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.addTaskToGoalUseCase.execute(req.params.id, req.body.id)

      res.status(200).json({
        status: "success",
        message: "Task added to goal successfully",
      })
    } catch (error) {
      next(error)
    }
  }

  async removeTask(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.removeTaskFromGoalUseCase.execute(req.params.id, req.body.id)

      res.status(200).json({
        status: "success",
        message: "Task removed from goal successfully",
      })
    } catch (error) {
      next(error)
    }
  }

  async getStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.role === "ADMIN" ? undefined : req.user!.userId
      const stats = await this.getGoalsStatsUseCase.execute(userId)

      res.status(200).json({
        status: "success",
        data: stats,
      })
    } catch (error) {
      next(error)
    }
  }
}
