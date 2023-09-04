import { ObjectType, Field } from 'type-graphql'
import { TransactionError } from './TransactionError'

@ObjectType()
export class TransactionResult {
  constructor(content: TransactionError | Buffer | string) {
    if (content instanceof TransactionError) {
      this.error = content
    } else if (content instanceof Buffer) {
      this.messageId = content.toString('hex')
    } else if (typeof content === 'string') {
      this.messageId = content
    }
  }

  // the error if one happened
  @Field(() => TransactionError, { nullable: true })
  error?: TransactionError

  // if no error happend, the message id of the iota transaction
  @Field(() => String, { nullable: true })
  messageId?: string
}
