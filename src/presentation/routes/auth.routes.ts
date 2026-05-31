import { Router } from "express"
import type { AuthController } from "../controllers/auth.controller"
import { validateMiddleware } from "../middlewares/validate.middleware"
import { registerSchema, loginSchema } from "../../shared/validators/auth.validators"

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router()

  router.post("/register", validateMiddleware(registerSchema), (req, res, next) =>
    authController.register(req, res, next),
  )

  router.post("/login", validateMiddleware(loginSchema), (req, res, next) => authController.login(req, res, next))

  return router
}
