import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UpdateUserUseCase } from './update-user.use-case';
import { NotFoundError } from '../../../shared/errors/not-found-error';

describe('UpdateUserUseCase', () => {
  const userRepositoryMock = {
    findById: vi.fn(),
    update: vi.fn(),
  };

  const hashProviderMock = {
    hash: vi.fn(),
  };

  const useCase = new UpdateUserUseCase(
    userRepositoryMock as any,
    hashProviderMock as any,
  );

  const existingUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'USER',
    password: 'hashed-old',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update user without changing password', async () => {
    userRepositoryMock.findById.mockResolvedValue(existingUser);

    const updatedUser = {
      ...existingUser,
      name: 'John Updated',
    };

    userRepositoryMock.update.mockResolvedValue(updatedUser);

    const result = await useCase.execute('1', { name: 'John Updated' });

    // expect(result.password).toBeUndefined();
    expect(result).not.toHaveProperty('password');

    expect(userRepositoryMock.update).toHaveBeenCalledWith('1', {
      name: 'John Updated',
    });
  });

  it('should update user and hash the new password', async () => {
    userRepositoryMock.findById.mockResolvedValue(existingUser);

    hashProviderMock.hash.mockResolvedValue('hashed-new');

    const updatedUser = {
      ...existingUser,
      password: 'hashed-new',
    };

    userRepositoryMock.update.mockResolvedValue(updatedUser);

    const result = await useCase.execute('1', { password: '123' });

    expect(hashProviderMock.hash).toHaveBeenCalledWith('123');
    // expect(result.password).toBeUndefined();
    expect(result).not.toHaveProperty('password');
  });

  it('should throw NotFoundError if user does not exist', async () => {
    userRepositoryMock.findById.mockResolvedValue(null);

    await expect(useCase.execute('1', { name: 'Test' })).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('should return user without password', async () => {
    userRepositoryMock.findById.mockResolvedValue(existingUser);
    userRepositoryMock.update.mockResolvedValue(existingUser);

    const result = await useCase.execute('1', {});

    expect(result).not.toHaveProperty('password');
  });
});
