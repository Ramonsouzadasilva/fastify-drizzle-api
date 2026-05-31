import type { TaskRepository } from "../../../domain/repositories/task.repository"
import type { TaskEntity, UpdateTaskDTO } from "../../../domain/entities/task.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string, data: UpdateTaskDTO): Promise<TaskEntity> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new NotFoundError("Task not found")
    }

    return await this.taskRepository.update(id, data)
  }
}
