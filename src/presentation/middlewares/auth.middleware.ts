import type { Request, Response, NextFunction } from "express"
import type { IJwtProvider } from "../../infrastructure/security/jwt-provider"
import { UnauthorizedError } from "../../shared/errors/unauthorized-error"

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    role: string
  }
}

export function authMiddleware(jwtProvider: IJwtProvider) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        throw new UnauthorizedError("No token provided")
      }

      const [, token] = authHeader.split(" ")

      if (!token) {
        throw new UnauthorizedError("Token malformed")
      }

      const decoded = jwtProvider.verify(token)

      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
