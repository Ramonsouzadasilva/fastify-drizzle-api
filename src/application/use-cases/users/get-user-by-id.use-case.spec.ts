import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';

describe('GetUserByIdUseCase', () => {
  const userRepository = {
    findById: vi.fn(),
  };

  let sut: GetUserByIdUseCase;

  beforeEach(() => {
    vi.resetAllMocks();

    sut = new GetUserByIdUseCase(userRepository as any);
  });

  it('should return user when it exists', async () => {
    const fakeUser = {
      id: 'u1',
      name: 'Ramon Souza',
      email: 'ramon@example.com',
      role: 'ADMIN',
      password: 'hashed',
    };

    userRepository.findById.mockResolvedValue(fakeUser);

    const result = await sut.execute('u1');

    expect(result).toEqual({
      id: fakeUser.id,
      name: fakeUser.name,
      email: fakeUser.email,
      role: fakeUser.role,
    });
  });

  it('should throw NotFoundError when user does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(() => sut.execute('invalid-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('should not return the password field', async () => {
    const fakeUser = {
      id: 'u2',
      name: 'Test User',
      email: 'user@mail.com',
      role: 'USER',
      password: 'hashed-password',
    };

    userRepository.findById.mockResolvedValue(fakeUser);

    const result = await sut.execute('u2');

    expect('password' in result).toBe(false);
  });
});
