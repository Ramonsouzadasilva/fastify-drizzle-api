import type { UserRepository } from "../../../domain/repositories/user.repository"
import type { UserEntity } from "../../../domain/entities/user.entity"

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(page: number, limit: number): Promise<{ users: Omit<UserEntity, "password">[]; total: number }> {
    const { users, total } = await this.userRepository.findAll(page, limit)

    const usersWithoutPassword = users.map(({ password, ...user }) => user)

    return { users: usersWithoutPassword, total }
  }
}
