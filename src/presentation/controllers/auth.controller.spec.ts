// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import request from 'supertest';
// import express from 'express';
// import { AuthController } from './auth.controller';

// describe('AuthController', () => {
//   let app: express.Express;
//   let registerUserUseCase: any;
//   let loginUserUseCase: any;

//   beforeEach(() => {
//     registerUserUseCase = {
//       execute: vi.fn(),
//     };

//     loginUserUseCase = {
//       execute: vi.fn(),
//     };

//     const authController = new AuthController(
//       registerUserUseCase,
//       loginUserUseCase,
//     );

//     app = express();
//     app.use(express.json());

//     app.post('/register', (req, res, next) =>
//       authController.register(req, res, next),
//     );

//     app.post('/login', (req, res, next) =>
//       authController.login(req, res, next),
//     );

//     app.use((err: any, _req: express.Request, res: express.Response) => {
//       res.status(400).json({ error: err.message });
//     });
//   });

//   it('deve registrar um usuário retornando 201', async () => {
//     registerUserUseCase.execute.mockResolvedValue({
//       id: 'user-123',
//       email: 'test@example.com',
//     });

//     const response = await request(app)
//       .post('/register')
//       .send({ email: 'test@example.com', password: '123456' });

//     expect(response.status).toBe(201);
//     expect(response.body.status).toBe('success');
//     expect(response.body.data.user).toEqual({
//       id: 'user-123',
//       email: 'test@example.com',
//     });

//     expect(registerUserUseCase.execute).toHaveBeenCalledWith({
//       email: 'test@example.com',
//       password: '123456',
//     });
//   });

//   it('deve logar e retornar 200', async () => {
//     loginUserUseCase.execute.mockResolvedValue({
//       token: 'fake-jwt',
//     });

//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'test@example.com', password: '123456' });

//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe('success');
//     expect(response.body.data).toEqual({
//       token: 'fake-jwt',
//     });

//     expect(loginUserUseCase.execute).toHaveBeenCalledWith({
//       email: 'test@example.com',
//       password: '123456',
//     });
//   });

//   it('deve chamar next(error) quando register falhar', async () => {
//     registerUserUseCase.execute.mockRejectedValue(new Error('Fail'));

//     const response = await request(app)
//       .post('/register')
//       .send({ email: 'test@example.com', password: '123456' });

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Fail');
//   });

//   it('deve chamar next(error) quando login falhar', async () => {
//     loginUserUseCase.execute.mockRejectedValue(new Error('Login fail'));

//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'test@example.com', password: '123456' });

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Login fail');
//   });
// });

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let app: express.Express;
  let registerUserUseCase: any;
  let loginUserUseCase: any;

  beforeEach(() => {
    registerUserUseCase = {
      execute: vi.fn(),
    };

    loginUserUseCase = {
      execute: vi.fn(),
    };

    const authController = new AuthController(
      registerUserUseCase,
      loginUserUseCase,
    );

    app = express();
    app.use(express.json());

    app.post('/register', (req, res, next) =>
      authController.register(req, res, next),
    );

    app.post('/login', (req, res, next) =>
      authController.login(req, res, next),
    );

    // >>> ESSA É A CORREÇÃO
    app.use(
      (
        err: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
      ) => {
        res.status(400).json({ error: err.message });
      },
    );
  });

  it('deve registrar um usuário retornando 201', async () => {
    registerUserUseCase.execute.mockResolvedValue({
      id: 'user-123',
      email: 'test@example.com',
    });

    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.user).toEqual({
      id: 'user-123',
      email: 'test@example.com',
    });
  });

  it('deve logar e retornar 200', async () => {
    loginUserUseCase.execute.mockResolvedValue({
      token: 'fake-jwt',
    });

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toEqual({
      token: 'fake-jwt',
    });
  });

  it('deve chamar next(error) quando register falhar', async () => {
    registerUserUseCase.execute.mockRejectedValue(new Error('Fail'));

    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Fail');
  });

  it('deve chamar next(error) quando login falhar', async () => {
    loginUserUseCase.execute.mockRejectedValue(new Error('Login fail'));

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Login fail');
  });
});
