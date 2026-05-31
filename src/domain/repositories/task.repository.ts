import type { CreateTaskDTO, TaskEntity, UpdateTaskDTO } from "../entities/task.entity"

export interface TaskRepository {
  create(data: CreateTaskDTO): Promise<TaskEntity>
  findById(id: string): Promise<TaskEntity | null>
  findByUserId(userId: string, page: number, limit: number): Promise<{ tasks: TaskEntity[]; total: number }>
  findAll(page: number, limit: number): Promise<{ tasks: TaskEntity[]; total: number }>
  update(id: string, data: UpdateTaskDTO): Promise<TaskEntity>
  delete(id: string): Promise<void>
}
