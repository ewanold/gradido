import { EntityRepository, Repository } from 'typeorm'
import { Transaction } from '@entity/Transaction'

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async findDecayStartBlock(): Promise<Transaction | undefined> {
    return this.createQueryBuilder('transaction')
      .where('transaction.transactionTypeId = :transactionTypeId', { transactionTypeId: 9 })
      .orderBy('received', 'ASC')
      .getOne()
  }

  async joinFullTransactionsByIds(transactionIds: number[]): Promise<Transaction[]> {
    return this.createQueryBuilder('transaction')
      .where('transaction.id IN (:...transactions)', { transactions: transactionIds })
      .leftJoinAndSelect(
        'transaction.transactionSendCoin',
        'transactionSendCoin',
        // 'transactionSendCoin.transaction_id = transaction.id',
      )
      .leftJoinAndSelect(
        'transaction.transactionCreation',
        'transactionCreation',
        // 'transactionSendCoin.transaction_id = transaction.id',
      )
      .getMany()
  }

  async findLastNr(): Promise<number> {
    const transaction = await this.createQueryBuilder('transaction')
      .orderBy('nr', 'DESC')
      .limit(1)
      .getOne()
    return transaction ? transaction.nr : 0
  }
}
