import { MaxLength, MinLength } from 'class-validator'
import { Decimal } from 'decimal.js-light'
import { ArgsType, Field, InputType } from 'type-graphql'

import { MEMO_MAX_CHARS, MEMO_MIN_CHARS } from '@/graphql/resolver/const/const'

@InputType()
@ArgsType()
export class ContributionArgs {
  @Field(() => Decimal)
  amount: Decimal

  @Field(() => String)
  @MaxLength(MEMO_MAX_CHARS)
  @MinLength(MEMO_MIN_CHARS)
  memo: string

  @Field(() => String)
  creationDate: string
}
