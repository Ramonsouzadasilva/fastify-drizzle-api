import type { TaskRepository } from "../../../domain/repositories/task.repository"
import type { TaskEntity } from "../../../domain/entities/task.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class GetTaskByIdUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new NotFoundError("Task not found")
    }

    return task
  }
}
