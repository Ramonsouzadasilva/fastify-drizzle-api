import type { TaskRepository } from "../../../domain/repositories/task.repository"
import type { CreateTaskDTO, TaskEntity } from "../../../domain/entities/task.entity"

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(data: CreateTaskDTO): Promise<TaskEntity> {
    return await this.taskRepository.create(data)
  }
}
