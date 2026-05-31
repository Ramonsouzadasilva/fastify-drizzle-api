import { DrizzleUserRepository } from '../../infrastructure/repositories/drizzle-user.repository';
import { DrizzleTaskRepository } from '../../infrastructure/repositories/drizzle-task.repository';
import { DrizzleGoalRepository } from '../../infrastructure/repositories/drizzle-goal.repository';
import { DrizzleTransactionRepository } from '../../infrastructure/repositories/drizzle-transaction.repository';
import { DrizzleFinancialGoalRepository } from '../../infrastructure/repositories/drizzle-financial-goal.repository';

export class RepositoriesFactory {
  static createUserRepository() {
    return new DrizzleUserRepository();
  }

  static createTaskRepository() {
    return new DrizzleTaskRepository();
  }

  static createGoalRepository() {
    return new DrizzleGoalRepository();
  }

  static createTransactionRepository() {
    return new DrizzleTransactionRepository();
  }

  static createFinancialGoalRepository() {
    return new DrizzleFinancialGoalRepository();
  }
}
