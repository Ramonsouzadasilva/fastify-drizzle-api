import { Router } from 'express';
import type { FinancialGoalController } from '../controllers/financial-goal.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateMiddleware } from '../middlewares/validate.middleware';
import {
  createFinancialGoalSchema,
  updateFinancialGoalSchema,
  addTransactionToGoalSchema,
  removeTransactionFromGoalSchema,
} from '../../shared/validators/financial-goal.validators';
import type { IJwtProvider } from '../../infrastructure/security/jwt-provider';

export function createFinancialGoalRoutes(
  financialGoalController: FinancialGoalController,
  jwtProvider: IJwtProvider
): Router {
  const router = Router();

  router.use(authMiddleware(jwtProvider));

  router.post(
    '/',
    validateMiddleware(createFinancialGoalSchema),
    (req, res, next) => financialGoalController.create(req, res, next)
  );
  router.get('/', (req, res, next) =>
    financialGoalController.getAll(req, res, next)
  );
  router.get('/stats', (req, res, next) =>
    financialGoalController.getStats(req, res, next)
  );
  router.get('/:id', (req, res, next) =>
    financialGoalController.getById(req, res, next)
  );
  router.put(
    '/:id',
    validateMiddleware(updateFinancialGoalSchema),
    (req, res, next) => financialGoalController.update(req, res, next)
  );
  router.patch(
    '/:id/transactions',
    validateMiddleware(addTransactionToGoalSchema),
    (req, res, next) => financialGoalController.addTransaction(req, res, next)
  );
  router.delete(
    '/:id/transactions',
    validateMiddleware(removeTransactionFromGoalSchema),
    (req, res, next) =>
      financialGoalController.removeTransaction(req, res, next)
  );
  router.delete('/:id', (req, res, next) =>
    financialGoalController.delete(req, res, next)
  );

  return router;
}
