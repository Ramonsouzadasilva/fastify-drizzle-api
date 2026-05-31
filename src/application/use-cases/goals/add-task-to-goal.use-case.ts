import type { GoalRepository } from "../../../domain/repositories/goal.repository"
import type { TaskRepository } from "../../../domain/repositories/task.repository"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class AddTaskToGoalUseCase {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(goalId: string, taskId: string): Promise<void> {
    const goal = await this.goalRepository.findById(goalId)
    if (!goal) {
      throw new NotFoundError("Goal not found")
    }

    const task = await this.taskRepository.findById(taskId)
    if (!task) {
      throw new NotFoundError("Task not found")
    }

    await this.goalRepository.addTask(goalId, taskId)
  }
}
