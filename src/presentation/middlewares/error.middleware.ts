import type { Request, Response, NextFunction } from "express"
import { AppError } from "../../shared/errors/app-error"

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    })
  }

  console.error("Internal Server Error:", err)

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  })
}
