import type { Request, Response, NextFunction } from 'express';
import type { RegisterUserUseCase } from '../../application/use-cases/auth/register-user.use-case';
import type { LoginUserUseCase } from '../../application/use-cases/auth/login-user.use-case';

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await this.registerUserUseCase.execute(req.body);

      res.status(201).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.loginUserUseCase.execute(req.body);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
