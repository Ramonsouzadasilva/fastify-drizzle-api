import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteUserUseCase } from './delete-user.use-case';
import { NotFoundError } from '../../../shared/errors/not-found-error';

describe('DeleteUserUseCase', () => {
  const userRepositoryMock = {
    findById: vi.fn(),
    delete: vi.fn(),
  };

  const useCase = new DeleteUserUseCase(userRepositoryMock as any);

  const existingUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'USER',
    password: 'hashed',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete a user successfully', async () => {
    userRepositoryMock.findById.mockResolvedValue(existingUser);
    userRepositoryMock.delete.mockResolvedValue(undefined);

    await expect(useCase.execute('1')).resolves.toBeUndefined();

    expect(userRepositoryMock.findById).toHaveBeenCalledWith('1');
    expect(userRepositoryMock.delete).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundError if user does not exist', async () => {
    userRepositoryMock.findById.mockResolvedValue(null);

    await expect(useCase.execute('1')).rejects.toBeInstanceOf(NotFoundError);

    expect(userRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should return void', async () => {
    userRepositoryMock.findById.mockResolvedValue(existingUser);
    userRepositoryMock.delete.mockResolvedValue(undefined);

    const result = await useCase.execute('1');

    expect(result).toBeUndefined();
  });
});
