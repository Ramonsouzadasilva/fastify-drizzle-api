import type { UserRepository } from "../../../domain/repositories/user.repository"
import { type CreateUserDTO, type UserEntity, UserRole } from "../../../domain/entities/user.entity"
import type { IHashProvider } from "../../../infrastructure/security/hash-provider"
import { AppError } from "../../../shared/errors/app-error"

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(data: CreateUserDTO): Promise<Omit<UserEntity, "password">> {
    const existingUser = await this.userRepository.findByEmail(data.email)

    if (existingUser) {
      throw new AppError("Email already in use", 409)
    }

    const hashedPassword = await this.hashProvider.hash(data.password)

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      role: data.role || UserRole.USER,
    })

    const { password, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}
