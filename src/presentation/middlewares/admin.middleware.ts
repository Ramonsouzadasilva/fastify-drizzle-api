import type { Response, NextFunction } from "express"
import type { AuthRequest } from "./auth.middleware"
import { ForbiddenError } from "../../shared/errors/forbidden-error"

export function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new ForbiddenError("Authentication required")
    }

    if (req.user.role !== "ADMIN") {
      throw new ForbiddenError("Admin access required")
    }

    next()
  } catch (error) {
    next(error)
  }
}
