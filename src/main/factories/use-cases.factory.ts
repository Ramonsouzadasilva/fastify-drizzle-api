import { RepositoriesFactory } from "./repositories.factory"
import { SecurityFactory } from "./security.factory"

// Auth
import { RegisterUserUseCase } from "../../application/use-cases/auth/register-user.use-case"
import { LoginUserUseCase } from "../../application/use-cases/auth/login-user.use-case"

// Users
import { GetAllUsersUseCase } from "../../application/use-cases/users/get-all-users.use-case"
import { GetUserByIdUseCase } from "../../application/use-cases/users/get-user-by-id.use-case"
import { UpdateUserUseCase } from "../../application/use-cases/users/update-user.use-case"
import { DeleteUserUseCase } from "../../application/use-cases/users/delete-user.use-case"

// Tasks
import { CreateTaskUseCase } from "../../application/use-cases/tasks/create-task.use-case"
import { GetAllTasksUseCase } from "../../application/use-cases/tasks/get-all-tasks.use-case"
import { GetTaskByIdUseCase } from "../../application/use-cases/tasks/get-task-by-id.use-case"
import { UpdateTaskUseCase } from "../../application/use-cases/tasks/update-task.use-case"
import { DeleteTaskUseCase } from "../../application/use-cases/tasks/delete-task.use-case"

// Goals
import { CreateGoalUseCase } from "../../application/use-cases/goals/create-goal.use-case"
import { GetAllGoalsUseCase } from "../../application/use-cases/goals/get-all-goals.use-case"
import { GetGoalByIdUseCase } from "../../application/use-cases/goals/get-goal-by-id.use-case"
import { UpdateGoalUseCase } from "../../application/use-cases/goals/update-goal.use-case"
import { DeleteGoalUseCase } from "../../application/use-cases/goals/delete-goal.use-case"
import { AddTaskToGoalUseCase } from "../../application/use-cases/goals/add-task-to-goal.use-case"
import { RemoveTaskFromGoalUseCase } from "../../application/use-cases/goals/remove-task-from-goal.use-case"
import { GetGoalsStatsUseCase } from "../../application/use-cases/goals/get-goals-stats.use-case"

// Transactions
import { CreateTransactionUseCase } from "../../application/use-cases/transactions/create-transaction.use-case"
import { GetAllTransactionsUseCase } from "../../application/use-cases/transactions/get-all-transactions.use-case"
import { GetTransactionByIdUseCase } from "../../application/use-cases/transactions/get-transaction-by-id.use-case"
import { UpdateTransactionUseCase } from "../../application/use-cases/transactions/update-transaction.use-case"
import { DeleteTransactionUseCase } from "../../application/use-cases/transactions/delete-transaction.use-case"

// Financial Goals
import { CreateFinancialGoalUseCase } from "../../application/use-cases/financial-goals/create-financial-goal.use-case"
import { GetAllFinancialGoalsUseCase } from "../../application/use-cases/financial-goals/get-all-financial-goals.use-case"
import { GetFinancialGoalByIdUseCase } from "../../application/use-cases/financial-goals/get-financial-goal-by-id.use-case"
import { UpdateFinancialGoalUseCase } from "../../application/use-cases/financial-goals/update-financial-goal.use-case"
import { DeleteFinancialGoalUseCase } from "../../application/use-cases/financial-goals/delete-financial-goal.use-case"
import { AddTransactionToFinancialGoalUseCase } from "../../application/use-cases/financial-goals/add-transaction-to-goal.use-case"
import { RemoveTransactionFromFinancialGoalUseCase } from "../../application/use-cases/financial-goals/remove-transaction-from-goal.use-case"
import { GetFinancialGoalsStatsUseCase } from "../../application/use-cases/financial-goals/get-financial-goals-stats.use-case"

export class UseCasesFactory {
  // Auth
  static createRegisterUserUseCase() {
    return new RegisterUserUseCase(RepositoriesFactory.createUserRepository(), SecurityFactory.createHashProvider())
  }

  static createLoginUserUseCase() {
    return new LoginUserUseCase(
      RepositoriesFactory.createUserRepository(),
      SecurityFactory.createHashProvider(),
      SecurityFactory.createJwtProvider(),
    )
  }

  // Users
  static createGetAllUsersUseCase() {
    return new GetAllUsersUseCase(RepositoriesFactory.createUserRepository())
  }

  static createGetUserByIdUseCase() {
    return new GetUserByIdUseCase(RepositoriesFactory.createUserRepository())
  }

  static createUpdateUserUseCase() {
    return new UpdateUserUseCase(RepositoriesFactory.createUserRepository(), SecurityFactory.createHashProvider())
  }

  static createDeleteUserUseCase() {
    return new DeleteUserUseCase(RepositoriesFactory.createUserRepository())
  }

  // Tasks
  static createCreateTaskUseCase() {
    return new CreateTaskUseCase(RepositoriesFactory.createTaskRepository())
  }

  static createGetAllTasksUseCase() {
    return new GetAllTasksUseCase(RepositoriesFactory.createTaskRepository())
  }

  static createGetTaskByIdUseCase() {
    return new GetTaskByIdUseCase(RepositoriesFactory.createTaskRepository())
  }

  static createUpdateTaskUseCase() {
    return new UpdateTaskUseCase(RepositoriesFactory.createTaskRepository())
  }

  static createDeleteTaskUseCase() {
    return new DeleteTaskUseCase(RepositoriesFactory.createTaskRepository())
  }

  // Goals
  static createCreateGoalUseCase() {
    return new CreateGoalUseCase(RepositoriesFactory.createGoalRepository())
  }

  static createGetAllGoalsUseCase() {
    return new GetAllGoalsUseCase(RepositoriesFactory.createGoalRepository())
  }

  static createGetGoalByIdUseCase() {
    return new GetGoalByIdUseCase(RepositoriesFactory.createGoalRepository())
  }

  static createUpdateGoalUseCase() {
    return new UpdateGoalUseCase(RepositoriesFactory.createGoalRepository())
  }

  static createDeleteGoalUseCase() {
    return new DeleteGoalUseCase(RepositoriesFactory.createGoalRepository())
  }

  static createAddTaskToGoalUseCase() {
    return new AddTaskToGoalUseCase(
      RepositoriesFactory.createGoalRepository(),
      RepositoriesFactory.createTaskRepository(),
    )
  }

  static createRemoveTaskFromGoalUseCase() {
    return new RemoveTaskFromGoalUseCase(RepositoriesFactory.createGoalRepository())
  }

  static createGetGoalsStatsUseCase() {
    return new GetGoalsStatsUseCase(RepositoriesFactory.createGoalRepository())
  }

  // Transactions
  static createCreateTransactionUseCase() {
    return new CreateTransactionUseCase(RepositoriesFactory.createTransactionRepository())
  }

  static createGetAllTransactionsUseCase() {
    return new GetAllTransactionsUseCase(RepositoriesFactory.createTransactionRepository())
  }

  static createGetTransactionByIdUseCase() {
    return new GetTransactionByIdUseCase(RepositoriesFactory.createTransactionRepository())
  }

  static createUpdateTransactionUseCase() {
    return new UpdateTransactionUseCase(RepositoriesFactory.createTransactionRepository())
  }

  static createDeleteTransactionUseCase() {
    return new DeleteTransactionUseCase(RepositoriesFactory.createTransactionRepository())
  }

  // Financial Goals
  static createCreateFinancialGoalUseCase() {
    return new CreateFinancialGoalUseCase(RepositoriesFactory.createFinancialGoalRepository())
  }

  static createGetAllFinancialGoalsUseCase() {
    return new GetAllFinancialGoalsUseCase(RepositoriesFactory.createFinancialGoalRepository())
  }

  static createGetFinancialGoalByIdUseCase() {
    return new GetFinancialGoalByIdUseCase(RepositoriesFactory.createFinancialGoalRepository())
  }

  static createUpdateFinancialGoalUseCase() {
    return new UpdateFinancialGoalUseCase(RepositoriesFactory.createFinancialGoalRepository())
  }

  static createDeleteFinancialGoalUseCase() {
    return new DeleteFinancialGoalUseCase(RepositoriesFactory.createFinancialGoalRepository())
  }

  static createAddTransactionToFinancialGoalUseCase() {
    return new AddTransactionToFinancialGoalUseCase(
      RepositoriesFactory.createFinancialGoalRepository(),
      RepositoriesFactory.createTransactionRepository(),
    )
  }

  static createRemoveTransactionFromFinancialGoalUseCase() {
    return new RemoveTransactionFromFinancialGoalUseCase(
      RepositoriesFactory.createFinancialGoalRepository(),
      RepositoriesFactory.createTransactionRepository(),
    )
  }

  static createGetFinancialGoalsStatsUseCase() {
    return new GetFinancialGoalsStatsUseCase(RepositoriesFactory.createFinancialGoalRepository())
  }
}
