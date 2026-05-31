import type { UserRepository } from "../../../domain/repositories/user.repository"
import type { UpdateUserDTO, UserEntity } from "../../../domain/entities/user.entity"
import type { IHashProvider } from "../../../infrastructure/security/hash-provider"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(id: string, data: UpdateUserDTO): Promise<Omit<UserEntity, "password">> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundError("User not found")
    }

    if (data.password) {
      data.password = await this.hashProvider.hash(data.password)
    }

    const updatedUser = await this.userRepository.update(id, data)

    const { password, ...userWithoutPassword } = updatedUser

    return userWithoutPassword
  }
}
