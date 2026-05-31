import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllTransactionsUseCase } from './get-all-transactions.use-case';
import { TransactionEntity } from '../../../domain/entities/transaction.entity';

describe('GetAllTransactionsUseCase', () => {
  const transactionRepositoryMock = {
    findAll: vi.fn(),
    findByUserId: vi.fn(),
  };

  const useCase = new GetAllTransactionsUseCase(
    transactionRepositoryMock as any,
  );

  const transactions: TransactionEntity[] = [
    {
      id: 'tx1',
      descricao: 'Almoço',
      tipo: 'DESPESA' as any,
      valor: 50,
      categoria: 'Comida',
      data: new Date(),
      status: 'PENDENTE' as any,
      userId: 'user01',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should list all transactions when userId is not provided', async () => {
    transactionRepositoryMock.findAll.mockResolvedValue({
      transactions,
      total: 1,
    });

    const result = await useCase.execute(1, 10);

    expect(transactionRepositoryMock.findAll).toHaveBeenCalledWith(1, 10);
    expect(result.transactions).toEqual(transactions);
    expect(result.total).toBe(1);
    expect(transactionRepositoryMock.findByUserId).not.toHaveBeenCalled();
  });

  it('should list user transactions when userId is provided', async () => {
    transactionRepositoryMock.findByUserId.mockResolvedValue({
      transactions,
      total: 1,
    });

    const result = await useCase.execute(1, 10, 'user01');

    expect(transactionRepositoryMock.findByUserId).toHaveBeenCalledWith(
      'user01',
      1,
      10,
    );
    expect(result.transactions).toEqual(transactions);
    expect(result.total).toBe(1);
    expect(transactionRepositoryMock.findAll).not.toHaveBeenCalled();
  });

  it('should propagate repository errors', async () => {
    transactionRepositoryMock.findAll.mockRejectedValue(new Error('db error'));

    await expect(useCase.execute(1, 10)).rejects.toThrow('db error');
  });
});
