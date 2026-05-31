import { describe, it, expect, vi } from 'vitest';
import { GetTransactionByIdUseCase } from './get-transaction-by-id.use-case';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import {
  TransactionStatus,
  TransactionType,
  type TransactionEntity,
} from '../../../domain/entities/transaction.entity';
import type { TransactionRepository } from '../../../domain/repositories/transaction.repository';

describe('GetTransactionByIdUseCase', () => {
  it('should return transaction when it exists', async () => {
    const mockTransaction: TransactionEntity = {
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

    const transactionRepository: TransactionRepository = {
      findById: vi.fn().mockResolvedValue(mockTransaction),
    } as any;

    const useCase = new GetTransactionByIdUseCase(transactionRepository);

    const result = await useCase.execute('tx-123');

    expect(result).toEqual(mockTransaction);
    expect(transactionRepository.findById).toHaveBeenCalledWith('tx-123');
  });

  it('should throw NotFoundError when transaction does not exist', async () => {
    const transactionRepository: TransactionRepository = {
      findById: vi.fn().mockResolvedValue(null),
    } as any;

    const useCase = new GetTransactionByIdUseCase(transactionRepository);

    await expect(useCase.execute('tx-999')).rejects.toThrow(NotFoundError);
    expect(transactionRepository.findById).toHaveBeenCalledWith('tx-999');
  });
});
