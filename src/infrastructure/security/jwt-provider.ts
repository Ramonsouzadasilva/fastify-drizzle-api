import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../../shared/errors/unauthorized-error"

export interface TokenPayload {
  userId: string
  email: string
  role: string
}

export interface IJwtProvider {
  sign(payload: TokenPayload): string
  verify(token: string): TokenPayload
}

export class JwtProvider implements IJwtProvider {
  private readonly secret: string
  private readonly expiresIn: string

  constructor() {
    this.secret = process.env.JWT_SECRET || "default-secret-key"
    this.expiresIn = process.env.JWT_EXPIRES_IN || "7d"
  }

  sign(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }

  verify(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload
      return decoded
    } catch (error) {
      throw new UnauthorizedError("Invalid or expired token")
    }
  }
}
