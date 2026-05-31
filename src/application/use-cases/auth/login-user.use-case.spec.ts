import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UnauthorizedError } from '../../../shared/errors/unauthorized-error';
import { LoginUserUseCase } from './login-user.use-case';

describe('LoginUserUseCase', () => {
  const userRepository = {
    findByEmail: vi.fn(),
  };

  const hashProvider = {
    compare: vi.fn(),
  };

  const jwtProvider = {
    sign: vi.fn(),
  };

  let sut: LoginUserUseCase;

  beforeEach(() => {
    vi.resetAllMocks();

    sut = new LoginUserUseCase(
      userRepository as any,
      hashProvider as any,
      jwtProvider as any,
    );
  });

  it('should authenticate user when credentials are valid', async () => {
    const fakeUser = {
      id: 'user-123',
      name: 'Ramon Souza',
      email: 'ramon@example.com',
      role: 'ADMIN',
      password: 'hashed-password',
    };

    userRepository.findByEmail.mockResolvedValue(fakeUser);
    hashProvider.compare.mockResolvedValue(true);
    jwtProvider.sign.mockReturnValue('fake-jwt-token');

    const result = await sut.execute({
      email: fakeUser.email,
      password: 'plain-password',
    });

    expect(result).toEqual({
      token: 'fake-jwt-token',
      user: {
        id: fakeUser.id,
        name: fakeUser.name,
        email: fakeUser.email,
        role: fakeUser.role,
      },
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith(fakeUser.email);
    expect(hashProvider.compare).toHaveBeenCalledWith(
      'plain-password',
      fakeUser.password,
    );
    expect(jwtProvider.sign).toHaveBeenCalled();
  });

  it('should throw UnauthorizedError when user does not exist', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(() =>
      sut.execute({
        email: 'invalid@example.com',
        password: 'any-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('should throw UnauthorizedError when password is invalid', async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: 'id',
      name: 'Test User',
      email: 'test@example.com',
      role: 'USER',
      password: 'hashed',
    });

    hashProvider.compare.mockResolvedValue(false);

    await expect(() =>
      sut.execute({
        email: 'test@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('should generate token with correct payload', async () => {
    const fakeUser = {
      id: 'u1',
      name: 'User Test',
      email: 'user@mail.com',
      role: 'ADMIN',
      password: 'hashed',
    };

    userRepository.findByEmail.mockResolvedValue(fakeUser);
    hashProvider.compare.mockResolvedValue(true);
    jwtProvider.sign.mockReturnValue('another-fake-token');

    await sut.execute({
      email: fakeUser.email,
      password: '123',
    });

    expect(jwtProvider.sign).toHaveBeenCalledWith({
      userId: fakeUser.id,
      email: fakeUser.email,
      role: fakeUser.role,
    });
  });
});
