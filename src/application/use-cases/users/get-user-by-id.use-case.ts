import type { UserRepository } from "../../../domain/repositories/user.repository"
import type { UserEntity } from "../../../domain/entities/user.entity"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<Omit<UserEntity, "password">> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundError("User not found")
    }

    const { password, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}
