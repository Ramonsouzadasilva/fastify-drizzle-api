import { Router } from "express"
import type { TransactionController } from "../controllers/transaction.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { validateMiddleware } from "../middlewares/validate.middleware"
import {
  createTransactionSchema,
  updateTransactionSchema,
  updateTransactionStatusSchema,
} from "../../shared/validators/transaction.validators"
import type { IJwtProvider } from "../../infrastructure/security/jwt-provider"

export function createTransactionRoutes(
  transactionController: TransactionController,
  jwtProvider: IJwtProvider,
): Router {
  const router = Router()

  router.use(authMiddleware(jwtProvider))

  router.post("/", validateMiddleware(createTransactionSchema), (req, res, next) =>
    transactionController.create(req, res, next),
  )
  router.get("/", (req, res, next) => transactionController.getAll(req, res, next))
  router.get("/:id", (req, res, next) => transactionController.getById(req, res, next))
  router.put("/:id", validateMiddleware(updateTransactionSchema), (req, res, next) =>
    transactionController.update(req, res, next),
  )
  router.patch("/:id/status", validateMiddleware(updateTransactionStatusSchema), (req, res, next) =>
    transactionController.updateStatus(req, res, next),
  )
  router.delete("/:id", (req, res, next) => transactionController.delete(req, res, next))

  return router
}
