import type { Response, NextFunction } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware"
import type { CreateTaskUseCase } from "../../application/use-cases/tasks/create-task.use-case"
import type { GetAllTasksUseCase } from "../../application/use-cases/tasks/get-all-tasks.use-case"
import type { GetTaskByIdUseCase } from "../../application/use-cases/tasks/get-task-by-id.use-case"
import type { UpdateTaskUseCase } from "../../application/use-cases/tasks/update-task.use-case"
import type { DeleteTaskUseCase } from "../../application/use-cases/tasks/delete-task.use-case"
import { createPaginatedResponse, parsePaginationParams } from "../../shared/utils/pagination"

export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await this.createTaskUseCase.execute({
        ...req.body,
        inicio: new Date(req.body.inicio),
        prazo: new Date(req.body.prazo),
        userId: req.user!.userId,
      })

      res.status(201).json({
        status: "success",
        data: { task },
      })
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit } = parsePaginationParams(req.query.page as string, req.query.limit as string)
      const userId = req.user!.role === "ADMIN" ? undefined : req.user!.userId
      const { tasks, total } = await this.getAllTasksUseCase.execute(page, limit, userId)

      res.status(200).json({
        status: "success",
        ...createPaginatedResponse(tasks, total, page, limit),
      })
    } catch (error) {
      next(error)
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await this.getTaskByIdUseCase.execute(req.params.id)

      res.status(200).json({
        status: "success",
        data: { task },
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

      const task = await this.updateTaskUseCase.execute(req.params.id, updateData)

      res.status(200).json({
        status: "success",
        data: { task },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await this.updateTaskUseCase.execute(req.params.id, { status: req.body.status })

      res.status(200).json({
        status: "success",
        data: { task },
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteTaskUseCase.execute(req.params.id)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
