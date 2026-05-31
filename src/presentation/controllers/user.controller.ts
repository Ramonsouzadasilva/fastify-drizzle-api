import type { Request, Response, NextFunction } from "express"
import type { GetAllUsersUseCase } from "../../application/use-cases/users/get-all-users.use-case"
import type { GetUserByIdUseCase } from "../../application/use-cases/users/get-user-by-id.use-case"
import type { UpdateUserUseCase } from "../../application/use-cases/users/update-user.use-case"
import type { DeleteUserUseCase } from "../../application/use-cases/users/delete-user.use-case"
import { createPaginatedResponse, parsePaginationParams } from "../../shared/utils/pagination"

export class UserController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit } = parsePaginationParams(req.query.page as string, req.query.limit as string)
      const { users, total } = await this.getAllUsersUseCase.execute(page, limit)

      res.status(200).json({
        status: "success",
        ...createPaginatedResponse(users, total, page, limit),
      })
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.getUserByIdUseCase.execute(req.params.id)

      res.status(200).json({
        status: "success",
        data: { user },
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.updateUserUseCase.execute(req.params.id, req.body)

      res.status(200).json({
        status: "success",
        data: { user },
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteUserUseCase.execute(req.params.id)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
