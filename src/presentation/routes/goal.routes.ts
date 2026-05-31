import { Router } from 'express';
import type { GoalController } from '../controllers/goal.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateMiddleware } from '../middlewares/validate.middleware';
import {
  createGoalSchema,
  updateGoalSchema,
  addTaskToGoalSchema,
  removeTaskFromGoalSchema,
} from '../../shared/validators/goal.validators';
import type { IJwtProvider } from '../../infrastructure/security/jwt-provider';

export function createGoalRoutes(
  goalController: GoalController,
  jwtProvider: IJwtProvider
): Router {
  const router = Router();

  router.use(authMiddleware(jwtProvider));

  router.post('/', validateMiddleware(createGoalSchema), (req, res, next) =>
    goalController.create(req, res, next)
  );
  router.get('/', (req, res, next) => goalController.getAll(req, res, next));
  router.get('/stats', (req, res, next) =>
    goalController.getStats(req, res, next)
  );
  router.get('/:id', (req, res, next) =>
    goalController.getById(req, res, next)
  );
  router.put('/:id', validateMiddleware(updateGoalSchema), (req, res, next) =>
    goalController.update(req, res, next)
  );
  router.patch(
    '/:id/tasks',
    validateMiddleware(addTaskToGoalSchema),
    (req, res, next) => goalController.addTask(req, res, next)
  );
  router.delete(
    '/:id/tasks',
    validateMiddleware(removeTaskFromGoalSchema),
    (req, res, next) => goalController.removeTask(req, res, next)
  );
  router.delete('/:id', (req, res, next) =>
    goalController.delete(req, res, next)
  );

  return router;
}
