import { Router } from "express"
import { createAuthRoutes } from "./auth.routes"
import { createUserRoutes } from "./user.routes"
import { createTaskRoutes } from "./task.routes"
import { createGoalRoutes } from "./goal.routes"
import { createTransactionRoutes } from "./transaction.routes"
import { createFinancialGoalRoutes } from "./financial-goal.routes"
import type { AuthController } from "../controllers/auth.controller"
import type { UserController } from "../controllers/user.controller"
import type { TaskController } from "../controllers/task.controller"
import type { GoalController } from "../controllers/goal.controller"
import type { TransactionController } from "../controllers/transaction.controller"
import type { FinancialGoalController } from "../controllers/financial-goal.controller"
import type { IJwtProvider } from "../../infrastructure/security/jwt-provider"

interface RoutesDependencies {
  authController: AuthController
  userController: UserController
  taskController: TaskController
  goalController: GoalController
  transactionController: TransactionController
  financialGoalController: FinancialGoalController
  jwtProvider: IJwtProvider
}

export function createRoutes(dependencies: RoutesDependencies): Router {
  const router = Router()

  router.use("/auth", createAuthRoutes(dependencies.authController))
  router.use("/users", createUserRoutes(dependencies.userController, dependencies.jwtProvider))
  router.use("/tasks", createTaskRoutes(dependencies.taskController, dependencies.jwtProvider))
  router.use("/goals", createGoalRoutes(dependencies.goalController, dependencies.jwtProvider))
  router.use("/transactions", createTransactionRoutes(dependencies.transactionController, dependencies.jwtProvider))
  router.use(
    "/financial-goals",
    createFinancialGoalRoutes(dependencies.financialGoalController, dependencies.jwtProvider),
  )

  return router
}
