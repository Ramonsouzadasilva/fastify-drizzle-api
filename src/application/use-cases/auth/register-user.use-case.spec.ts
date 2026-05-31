import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppError } from '../../../shared/errors/app-error';
import { UserRole } from '../../../domain/entities/user.entity';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
  const userRepository = {
    findByEmail: vi.fn(),
    create: vi.fn(),
  };

  const hashProvider = {
    hash: vi.fn(),
  };

  let sut: RegisterUserUseCase;

  beforeEach(() => {
    vi.resetAllMocks();

    sut = new RegisterUserUseCase(userRepository as any, hashProvider as any);
  });

  it('should create a new user when email is not in use', async () => {
    const input = {
      name: 'Ramon Souza',
      email: 'ramon@example.com',
      password: 'plain-pass',
      role: UserRole.ADMIN,
    };

    userRepository.findByEmail.mockResolvedValue(null);
    hashProvider.hash.mockResolvedValue('hashed-pass');
    userRepository.create.mockResolvedValue({
      ...input,
      id: 'user-123',
      password: 'hashed-pass',
    });

    const result = await sut.execute(input);

    expect(result).toEqual({
      id: 'user-123',
      name: input.name,
      email: input.email,
      role: input.role,
    });

    expect(hashProvider.hash).toHaveBeenCalledWith('plain-pass');
    expect(userRepository.create).toHaveBeenCalledWith({
      ...input,
      password: 'hashed-pass',
    });
  });

  it('should assign default role USER when role is not provided', async () => {
    const input = {
      name: 'User Test',
      email: 'user@mail.com',
      password: '123',
    };

    userRepository.findByEmail.mockResolvedValue(null);
    hashProvider.hash.mockResolvedValue('hashed-123');
    userRepository.create.mockResolvedValue({
      id: 'id-test',
      ...input,
      role: UserRole.USER,
      password: 'hashed-123',
    });

    const result = await sut.execute(input);

    expect(result.role).toBe(UserRole.USER);
  });

  it('should throw AppError when email is already in use', async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: 'id-existing',
      email: 'existing@mail.com',
    });

    await expect(() =>
      sut.execute({
        name: 'Test',
        email: 'existing@mail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return user without password field', async () => {
    const input = {
      name: 'Hidden',
      email: 'hidden@mail.com',
      password: 'pass',
    };

    userRepository.findByEmail.mockResolvedValue(null);
    hashProvider.hash.mockResolvedValue('hashed-pass');
    userRepository.create.mockResolvedValue({
      id: 'id-hidden',
      ...input,
      password: 'hashed-pass',
      role: UserRole.USER,
    });

    const result = await sut.execute(input);

    // expect(result.password).toBeUndefined();
    expect(result as any).not.toHaveProperty('password');
  });
});
