import { Router } from "express"
import type { TaskController } from "../controllers/task.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { validateMiddleware } from "../middlewares/validate.middleware"
import { createTaskSchema, updateTaskSchema, updateTaskStatusSchema } from "../../shared/validators/task.validators"
import type { IJwtProvider } from "../../infrastructure/security/jwt-provider"

export function createTaskRoutes(taskController: TaskController, jwtProvider: IJwtProvider): Router {
  const router = Router()

  router.use(authMiddleware(jwtProvider))

  router.post("/", validateMiddleware(createTaskSchema), (req, res, next) => taskController.create(req, res, next))
  router.get("/", (req, res, next) => taskController.getAll(req, res, next))
  router.get("/:id", (req, res, next) => taskController.getById(req, res, next))
  router.put("/:id", validateMiddleware(updateTaskSchema), (req, res, next) => taskController.update(req, res, next))
  router.patch("/:id/status", validateMiddleware(updateTaskStatusSchema), (req, res, next) =>
    taskController.updateStatus(req, res, next),
  )
  router.delete("/:id", (req, res, next) => taskController.delete(req, res, next))

  return router
}
