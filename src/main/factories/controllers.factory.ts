import { UseCasesFactory } from "./use-cases.factory"
import { AuthController } from "../../presentation/controllers/auth.controller"
import { UserController } from "../../presentation/controllers/user.controller"
import { TaskController } from "../../presentation/controllers/task.controller"
import { GoalController } from "../../presentation/controllers/goal.controller"
import { TransactionController } from "../../presentation/controllers/transaction.controller"
import { FinancialGoalController } from "../../presentation/controllers/financial-goal.controller"

export class ControllersFactory {
  static createAuthController() {
    return new AuthController(UseCasesFactory.createRegisterUserUseCase(), UseCasesFactory.createLoginUserUseCase())
  }

  static createUserController() {
    return new UserController(
      UseCasesFactory.createGetAllUsersUseCase(),
      UseCasesFactory.createGetUserByIdUseCase(),
      UseCasesFactory.createUpdateUserUseCase(),
      UseCasesFactory.createDeleteUserUseCase(),
    )
  }

  static createTaskController() {
    return new TaskController(
      UseCasesFactory.createCreateTaskUseCase(),
      UseCasesFactory.createGetAllTasksUseCase(),
      UseCasesFactory.createGetTaskByIdUseCase(),
      UseCasesFactory.createUpdateTaskUseCase(),
      UseCasesFactory.createDeleteTaskUseCase(),
    )
  }

  static createGoalController() {
    return new GoalController(
      UseCasesFactory.createCreateGoalUseCase(),
      UseCasesFactory.createGetAllGoalsUseCase(),
      UseCasesFactory.createGetGoalByIdUseCase(),
      UseCasesFactory.createUpdateGoalUseCase(),
      UseCasesFactory.createDeleteGoalUseCase(),
      UseCasesFactory.createAddTaskToGoalUseCase(),
      UseCasesFactory.createRemoveTaskFromGoalUseCase(),
      UseCasesFactory.createGetGoalsStatsUseCase(),
    )
  }

  static createTransactionController() {
    return new TransactionController(
      UseCasesFactory.createCreateTransactionUseCase(),
      UseCasesFactory.createGetAllTransactionsUseCase(),
      UseCasesFactory.createGetTransactionByIdUseCase(),
      UseCasesFactory.createUpdateTransactionUseCase(),
      UseCasesFactory.createDeleteTransactionUseCase(),
    )
  }

  static createFinancialGoalController() {
    return new FinancialGoalController(
      UseCasesFactory.createCreateFinancialGoalUseCase(),
      UseCasesFactory.createGetAllFinancialGoalsUseCase(),
      UseCasesFactory.createGetFinancialGoalByIdUseCase(),
      UseCasesFactory.createUpdateFinancialGoalUseCase(),
      UseCasesFactory.createDeleteFinancialGoalUseCase(),
      UseCasesFactory.createAddTransactionToFinancialGoalUseCase(),
      UseCasesFactory.createRemoveTransactionFromFinancialGoalUseCase(),
      UseCasesFactory.createGetFinancialGoalsStatsUseCase(),
    )
  }
}
