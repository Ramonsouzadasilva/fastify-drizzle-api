import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllUsersUseCase } from './get-all-users.use-case';

describe('GetAllUsersUseCase', () => {
  const userRepository = {
    findAll: vi.fn(),
  };

  let sut: GetAllUsersUseCase;

  beforeEach(() => {
    vi.resetAllMocks();

    sut = new GetAllUsersUseCase(userRepository as any);
  });

  it('should return users with total count', async () => {
    const fakeUsers = [
      {
        id: 'u1',
        name: 'User One',
        email: 'one@mail.com',
        role: 'USER',
        password: 'hashed1',
      },
      {
        id: 'u2',
        name: 'User Two',
        email: 'two@mail.com',
        role: 'ADMIN',
        password: 'hashed2',
      },
    ];

    userRepository.findAll.mockResolvedValue({
      users: fakeUsers,
      total: 2,
    });

    const result = await sut.execute(1, 10);

    expect(result).toEqual({
      users: [
        {
          id: 'u1',
          name: 'User One',
          email: 'one@mail.com',
          role: 'USER',
        },
        {
          id: 'u2',
          name: 'User Two',
          email: 'two@mail.com',
          role: 'ADMIN',
        },
      ],
      total: 2,
    });

    expect(userRepository.findAll).toHaveBeenCalledWith(1, 10);
  });

  it('should remove password field from all returned users', async () => {
    userRepository.findAll.mockResolvedValue({
      users: [
        {
          id: 'u1',
          name: 'A',
          email: 'a@mail.com',
          role: 'USER',
          password: 'h',
        },
      ],
      total: 1,
    });

    const result = await sut.execute(1, 10);

    expect('password' in result.users[0]).toBe(false);
  });

  it('should return empty list when repository returns no users', async () => {
    userRepository.findAll.mockResolvedValue({
      users: [],
      total: 0,
    });

    const result = await sut.execute(1, 10);

    expect(result).toEqual({
      users: [],
      total: 0,
    });
  });
});
