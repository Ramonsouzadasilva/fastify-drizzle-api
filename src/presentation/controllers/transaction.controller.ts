import type { Response, NextFunction } from "express"
import type { AuthRequest } from "../middlewares/auth.middleware"
import type { CreateTransactionUseCase } from "../../application/use-cases/transactions/create-transaction.use-case"
import type { GetAllTransactionsUseCase } from "../../application/use-cases/transactions/get-all-transactions.use-case"
import type { GetTransactionByIdUseCase } from "../../application/use-cases/transactions/get-transaction-by-id.use-case"
import type { UpdateTransactionUseCase } from "../../application/use-cases/transactions/update-transaction.use-case"
import type { DeleteTransactionUseCase } from "../../application/use-cases/transactions/delete-transaction.use-case"
import { createPaginatedResponse, parsePaginationParams } from "../../shared/utils/pagination"

export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getAllTransactionsUseCase: GetAllTransactionsUseCase,
    private readonly getTransactionByIdUseCase: GetTransactionByIdUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
  ) {}

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const transaction = await this.createTransactionUseCase.execute({
        ...req.body,
        data: new Date(req.body.data),
        userId: req.user!.userId,
      })

      res.status(201).json({
        status: "success",
        data: { transaction },
      })
    } catch (error) {
      next(error)
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit } = parsePaginationParams(req.query.page as string, req.query.limit as string)
      const userId = req.user!.role === "ADMIN" ? undefined : req.user!.userId
      const { transactions, total } = await this.getAllTransactionsUseCase.execute(page, limit, userId)

      res.status(200).json({
        status: "success",
        ...createPaginatedResponse(transactions, total, page, limit),
      })
    } catch (error) {
      next(error)
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const transaction = await this.getTransactionByIdUseCase.execute(req.params.id)

      res.status(200).json({
        status: "success",
        data: { transaction },
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updateData: any = { ...req.body }
      if (req.body.data) updateData.data = new Date(req.body.data)

      const transaction = await this.updateTransactionUseCase.execute(req.params.id, updateData)

      res.status(200).json({
        status: "success",
        data: { transaction },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const transaction = await this.updateTransactionUseCase.execute(req.params.id, { status: req.body.status })

      res.status(200).json({
        status: "success",
        data: { transaction },
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteTransactionUseCase.execute(req.params.id)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
