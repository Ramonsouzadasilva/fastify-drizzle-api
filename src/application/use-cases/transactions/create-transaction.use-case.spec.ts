import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTransactionUseCase } from './create-transaction.use-case';
import {
  TransactionStatus,
  TransactionType,
  type CreateTransactionDTO,
  type TransactionEntity,
} from '../../../domain/entities/transaction.entity';

describe('CreateTransactionUseCase', () => {
  const transactionRepositoryMock = {
    create: vi.fn(),
  };

  const useCase = new CreateTransactionUseCase(
    transactionRepositoryMock as any,
  );

  const input: CreateTransactionDTO = {
    descricao: 'Almoço',
    tipo: TransactionType.DESPESA,
    valor: 50,
    categoria: 'Comida',
    data: new Date('2025-01-10'),
    status: TransactionStatus.PENDENTE,
    userId: 'user01',
  };

  const createdTransaction: TransactionEntity = {
    id: 'tx123',
    descricao: 'Almoço',
    tipo: TransactionType.DESPESA,
    valor: 50,
    categoria: 'Comida',
    data: new Date('2025-01-10'),
    status: TransactionStatus.PENDENTE,
    userId: 'user01',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a transaction successfully', async () => {
    transactionRepositoryMock.create.mockResolvedValue(createdTransaction);

    const result = await useCase.execute(input);

    expect(transactionRepositoryMock.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(createdTransaction);
  });

  it('should propagate errors from repository', async () => {
    transactionRepositoryMock.create.mockRejectedValue(new Error('db error'));

    await expect(useCase.execute(input)).rejects.toThrow('db error');
  });

  it('should return the created transaction entity', async () => {
    transactionRepositoryMock.create.mockResolvedValue(createdTransaction);

    const result = await useCase.execute(input);

    expect(result.id).toBe('tx123');
    expect(result.descricao).toBe(input.descricao);
    expect(result.valor).toBe(input.valor);
    expect(result.status).toBe(TransactionStatus.PENDENTE);
  });
});
