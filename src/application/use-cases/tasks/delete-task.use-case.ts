import type { TaskRepository } from "../../../domain/repositories/task.repository"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new NotFoundError("Task not found")
    }

    await this.taskRepository.delete(id)
  }
}
