import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteTransactionUseCase } from './delete-transaction.use-case';
import { NotFoundError } from '../../../shared/errors/not-found-error';

describe('DeleteTransactionUseCase', () => {
  const transactionRepositoryMock = {
    findById: vi.fn(),
    delete: vi.fn(),
  };

  const useCase = new DeleteTransactionUseCase(
    transactionRepositoryMock as any,
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete a transaction when it exists', async () => {
    transactionRepositoryMock.findById.mockResolvedValue({ id: 'tx01' });
    transactionRepositoryMock.delete.mockResolvedValue(undefined);

    await useCase.execute('tx01');

    expect(transactionRepositoryMock.findById).toHaveBeenCalledWith('tx01');
    expect(transactionRepositoryMock.delete).toHaveBeenCalledWith('tx01');
  });

  it('should throw NotFoundError when transaction does not exist', async () => {
    transactionRepositoryMock.findById.mockResolvedValue(null);

    await expect(useCase.execute('tx01')).rejects.toBeInstanceOf(NotFoundError);
    expect(transactionRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should propagate errors from repository', async () => {
    transactionRepositoryMock.findById.mockResolvedValue({ id: 'tx01' });
    transactionRepositoryMock.delete.mockRejectedValue(new Error('db error'));

    await expect(useCase.execute('tx01')).rejects.toThrow('db error');
  });
});
