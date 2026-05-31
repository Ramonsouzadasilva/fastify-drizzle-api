import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from '../infrastructure/database/drizzle-client';
import { errorMiddleware } from '../presentation/middlewares/error.middleware';
import { createRoutes } from '../presentation/routes';
import { ControllersFactory } from './factories/controllers.factory';
import { SecurityFactory } from './factories/security.factory';
import { swaggerDocument } from './config/swagger';
import { env } from './config/env';

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cors());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
    });
    this.app.use('/api', limiter);

    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Swagger documentation
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: env.nodeEnv,
      });
    });

    // API routes
    const jwtProvider = SecurityFactory.createJwtProvider();
    const routes = createRoutes({
      authController: ControllersFactory.createAuthController(),
      userController: ControllersFactory.createUserController(),
      taskController: ControllersFactory.createTaskController(),
      goalController: ControllersFactory.createGoalController(),
      transactionController: ControllersFactory.createTransactionController(),
      financialGoalController:
        ControllersFactory.createFinancialGoalController(),
      jwtProvider,
    });

    this.app.use('/api', routes);
  }

  private setupErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  async start(): Promise<void> {
    await connectDatabase();

    this.app.listen(env.port, () => {
      console.log(`🚀 Server running on http://localhost:${env.port}`);
      console.log(
        `📚 API Documentation: http://localhost:${env.port}/api-docs`,
      );
      console.log(`🏥 Health Check: http://localhost:${env.port}/health`);
      console.log(`🌍 Environment: ${env.nodeEnv}`);
    });
  }

  getApp(): Express {
    return this.app;
  }
}
