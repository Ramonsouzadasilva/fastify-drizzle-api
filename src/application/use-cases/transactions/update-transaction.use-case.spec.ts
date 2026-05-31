import { describe, it, expect, vi } from 'vitest';
import { UpdateTransactionUseCase } from './update-transaction.use-case';
import { NotFoundError } from '../../../shared/errors/not-found-error';
import {
  TransactionStatus,
  TransactionType,
  type TransactionEntity,
  type UpdateTransactionDTO,
} from '../../../domain/entities/transaction.entity';
import type { TransactionRepository } from '../../../domain/repositories/transaction.repository';

describe('UpdateTransactionUseCase', () => {
  it('should update transaction when it exists', async () => {
    const existingTransaction: TransactionEntity = {
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

    const updateData: UpdateTransactionDTO = {
      valor: 55,
      status: TransactionStatus.CONFIRMADO,
    };

    const updatedTransaction: TransactionEntity = {
      ...existingTransaction,
      ...updateData,
      updatedAt: new Date(),
    };

    const transactionRepository: TransactionRepository = {
      findById: vi.fn().mockResolvedValue(existingTransaction),
      update: vi.fn().mockResolvedValue(updatedTransaction),
    } as any;

    const useCase = new UpdateTransactionUseCase(transactionRepository);

    const result = await useCase.execute('tx-123', updateData);

    expect(transactionRepository.findById).toHaveBeenCalledWith('tx-123');
    expect(transactionRepository.update).toHaveBeenCalledWith(
      'tx-123',
      updateData,
    );
    expect(result).toEqual(updatedTransaction);
  });

  it('should throw NotFoundError when transaction does not exist', async () => {
    const transactionRepository: TransactionRepository = {
      findById: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
    } as any;

    const useCase = new UpdateTransactionUseCase(transactionRepository);

    await expect(useCase.execute('tx-999', { valor: 10 })).rejects.toThrow(
      NotFoundError,
    );
    expect(transactionRepository.findById).toHaveBeenCalledWith('tx-999');
    expect(transactionRepository.update).not.toHaveBeenCalled();
  });
});
