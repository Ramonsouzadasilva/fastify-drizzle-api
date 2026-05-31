import type { UserRepository } from "../../../domain/repositories/user.repository"
import type { IHashProvider } from "../../../infrastructure/security/hash-provider"
import type { IJwtProvider } from "../../../infrastructure/security/jwt-provider"
import { UnauthorizedError } from "../../../shared/errors/unauthorized-error"

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: IHashProvider,
    private readonly jwtProvider: IJwtProvider,
  ) {}

  async execute({ email, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedError("Invalid credentials")
    }

    const isPasswordValid = await this.hashProvider.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials")
    }

    const token = this.jwtProvider.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  }
}
