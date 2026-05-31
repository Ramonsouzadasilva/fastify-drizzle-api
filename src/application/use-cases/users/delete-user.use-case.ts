import type { UserRepository } from "../../../domain/repositories/user.repository"
import { NotFoundError } from "../../../shared/errors/not-found-error"

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundError("User not found")
    }

    await this.userRepository.delete(id)
  }
}
