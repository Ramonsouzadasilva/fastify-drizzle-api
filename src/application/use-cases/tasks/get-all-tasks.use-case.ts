import type { TaskRepository } from "../../../domain/repositories/task.repository"
import type { TaskEntity } from "../../../domain/entities/task.entity"

export class GetAllTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(page: number, limit: number, userId?: string): Promise<{ tasks: TaskEntity[]; total: number }> {
    if (userId) {
      return await this.taskRepository.findByUserId(userId, page, limit)
    }
    return await this.taskRepository.findAll(page, limit)
  }
}
