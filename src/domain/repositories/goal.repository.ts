import type { CreateGoalDTO, GoalEntity, GoalWithStats, UpdateGoalDTO } from "../entities/goal.entity"

export interface GoalRepository {
  create(data: CreateGoalDTO): Promise<GoalEntity>
  findById(id: string): Promise<GoalEntity | null>
  findByIdWithStats(id: string): Promise<GoalWithStats | null>
  findByUserId(userId: string, page: number, limit: number): Promise<{ goals: GoalEntity[]; total: number }>
  findByUserIdWithStats(userId: string, page: number, limit: number): Promise<{ goals: GoalWithStats[]; total: number }>
  findAll(page: number, limit: number): Promise<{ goals: GoalEntity[]; total: number }>
  update(id: string, data: UpdateGoalDTO): Promise<GoalEntity>
  delete(id: string): Promise<void>
  addTask(goalId: string, taskId: string): Promise<void>
  removeTask(goalId: string, taskId: string): Promise<void>
}
