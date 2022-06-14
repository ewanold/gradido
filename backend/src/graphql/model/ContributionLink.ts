import { ObjectType, Field, Int } from 'type-graphql'
import Decimal from 'decimal.js-light'
import { ContributionLink as dbContributionLink } from '@entity/ContributionLink'

@ObjectType()
export class ContributionLink {
  constructor(contributionLink: dbContributionLink) {
    this.id = contributionLink.id
    this.amount = contributionLink.amount
    this.name = contributionLink.name
    this.memo = contributionLink.memo
    this.createdAt = contributionLink.createdAt
    this.deletedAt = contributionLink.deletedAt
    this.validFrom = contributionLink.validFrom
    this.validTo = contributionLink.validTo
    this.maxAmountPerMonth = contributionLink.maxAmountPerMonth
    this.cycle = contributionLink.cycle
    this.maxPerCycle = contributionLink.maxPerCycle
  }

  @Field(() => Number)
  id: number

  @Field(() => Decimal)
  amount: Decimal

  @Field(() => String)
  name: string

  @Field(() => String)
  memo: string

  @Field(() => String)
  code: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null

  @Field(() => Date, { nullable: true })
  validFrom: Date | null

  @Field(() => Date, { nullable: true })
  validTo: Date | null

  @Field(() => Decimal, { nullable: true })
  maxAmountPerMonth: Decimal | null

  @Field(() => string)
  cycle: string

  @Field(() => Int)
  maxPerCycle: number
}
