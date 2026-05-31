import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"
import { AppError } from "../../shared/errors/app-error"

export function validateMiddleware(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body)
      req.body = validated
      next()
    } catch (error: any) {
      if (error.errors) {
        const messages = error.errors.map((err: any) => err.message).join(", ")
        next(new AppError(messages, 400))
      } else {
        next(error)
      }
    }
  }
}
