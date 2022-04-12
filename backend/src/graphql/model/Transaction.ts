import { ObjectType, Field } from 'type-graphql'
import { Decay } from './Decay'
import { Transaction as dbTransaction } from '@entity/Transaction'
import Decimal from 'decimal.js-light'
import { TransactionTypeId } from '@enum/TransactionTypeId'
import { User } from './User'

@ObjectType()
export class Transaction {
  constructor(transaction: dbTransaction, user: User, linkedUser: User | null = null) {
    this.id = transaction.id
    this.user = user
    this.previous = transaction.previous
    this.typeId = transaction.typeId
    this.amount = transaction.amount.toDecimalPlaces(2, Decimal.ROUND_DOWN)
    this.balance = transaction.balance.toDecimalPlaces(2, Decimal.ROUND_DOWN)
    this.balanceDate = transaction.balanceDate
    if (!transaction.decayStart) {
      // TODO: hot fix, we should separate decay calculation from decay graphql model
      this.decay = new Decay({
        balance: transaction.balance.toDecimalPlaces(2, Decimal.ROUND_DOWN),
        decay: new Decimal(0),
        start: null,
        end: null,
        duration: null,
      })
    } else {
      this.decay = new Decay({
        balance: transaction.balance.toDecimalPlaces(2, Decimal.ROUND_DOWN),
        decay: transaction.decay.toDecimalPlaces(2, Decimal.ROUND_FLOOR),
        start: transaction.decayStart,
        end: transaction.balanceDate,
        duration: Math.round(
          (transaction.balanceDate.getTime() - transaction.decayStart.getTime()) / 1000,
        ),
      })
    }
    this.memo = transaction.memo
    this.creationDate = transaction.creationDate
    this.linkedUser = linkedUser
    this.linkedTransactionId = transaction.linkedTransactionId
    this.transactionLinkId = transaction.transactionLinkId
  }

  @Field(() => Number)
  id: number

  @Field(() => User)
  user: User

  @Field(() => Number, { nullable: true })
  previous: number | null

  @Field(() => TransactionTypeId)
  typeId: TransactionTypeId

  @Field(() => Decimal)
  amount: Decimal

  @Field(() => Decimal)
  balance: Decimal

  @Field(() => Date)
  balanceDate: Date

  @Field(() => Decay)
  decay: Decay

  @Field(() => String)
  memo: string

  @Field(() => Date, { nullable: true })
  creationDate: Date | null

  @Field(() => User, { nullable: true })
  linkedUser: User | null

  @Field(() => Number, { nullable: true })
  linkedTransactionId?: number | null

  // Links to the TransactionLink when transaction was created by a link
  @Field(() => Number, { nullable: true })
  transactionLinkId?: number | null
}
