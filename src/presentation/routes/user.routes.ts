import { Router } from "express"
import type { UserController } from "../controllers/user.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { adminMiddleware } from "../middlewares/admin.middleware"
import type { IJwtProvider } from "../../infrastructure/security/jwt-provider"

export function createUserRoutes(userController: UserController, jwtProvider: IJwtProvider): Router {
  const router = Router()

  router.use(authMiddleware(jwtProvider))
  router.use(adminMiddleware)

  router.get("/", (req, res, next) => userController.getAll(req, res, next))
  router.get("/:id", (req, res, next) => userController.getById(req, res, next))
  router.put("/:id", (req, res, next) => userController.update(req, res, next))
  router.delete("/:id", (req, res, next) => userController.delete(req, res, next))

  return router
}
