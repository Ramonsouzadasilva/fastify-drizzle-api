import type { CreateUserDTO, UpdateUserDTO, UserEntity } from "../entities/user.entity"

export interface UserRepository {
  create(data: CreateUserDTO): Promise<UserEntity>
  findById(id: string): Promise<UserEntity | null>
  findByEmail(email: string): Promise<UserEntity | null>
  findAll(page: number, limit: number): Promise<{ users: UserEntity[]; total: number }>
  update(id: string, data: UpdateUserDTO): Promise<UserEntity>
  delete(id: string): Promise<void>
}
