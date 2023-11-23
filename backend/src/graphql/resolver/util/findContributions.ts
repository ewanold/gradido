/* eslint-disable security/detect-object-injection */
import { Brackets, In, Like, Not, SelectQueryBuilder } from '@dbTools/typeorm'
import { Contribution as DbContribution } from '@entity/Contribution'
import { ContributionMessage } from '@entity/ContributionMessage'

import { Paginated } from '@arg/Paginated'
import { SearchContributionsFilterArgs } from '@arg/SearchContributionsFilterArgs'
import { Connection } from '@typeorm/connection'

import { Order } from '@/graphql/enum/Order'
import { LogError } from '@/server/LogError'

interface Relations {
  [key: string]: boolean | Relations
}

function joinRelationsRecursive(
  relations: Relations,
  queryBuilder: SelectQueryBuilder<DbContribution>,
  currentPath: string,
): void {
  for (const key in relations) {
    queryBuilder.leftJoinAndSelect(`${currentPath}.${key}`, key)
    if (typeof relations[key] === 'object') {
      // If it's a nested relation
      joinRelationsRecursive(relations[key] as Relations, queryBuilder, key)
    }
  }
}

export const findContributions = async (
  { pageSize = 3, currentPage = 1, order = Order.DESC }: Paginated,
  filter: SearchContributionsFilterArgs,
  withDeleted = false,
  relations: Relations | undefined = undefined,
): Promise<[DbContribution[], number]> => {
  const connection = await Connection.getInstance()
  if (!connection) {
    throw new LogError('Cannot connect to db')
  }
  const queryBuilder = connection.getRepository(DbContribution).createQueryBuilder('Contribution')
  if (relations) joinRelationsRecursive(relations, queryBuilder, 'Contribution')
  if (withDeleted) queryBuilder.withDeleted()
  queryBuilder.where({
    ...(filter.statusFilter?.length && { contributionStatus: In(filter.statusFilter) }),
    ...(filter.userId && { userId: filter.userId }),
    ...(filter.noHashtag && { memo: Not(Like(`%#%`)) }),
  })
  if (filter.hideResubmission) {
    queryBuilder
      .leftJoinAndSelect(
        (qb: SelectQueryBuilder<ContributionMessage>) => {
          return qb
            .select('resubmission_at', 'resubmissionAt')
            .addSelect('id', 'latestMessageId')
            .addSelect('contribution_id', 'latestMessageContributionId')
            .addSelect(
              'ROW_NUMBER() OVER (PARTITION BY latestMessageContributionId ORDER BY created_at DESC)',
              'rn',
            )
            .from(ContributionMessage, 'contributionMessage')
        },
        'latestContributionMessage',
        'latestContributionMessage.latestMessageContributionId = Contribution.id AND latestContributionMessage.rn = 1',
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('latestContributionMessage.resubmissionAt IS NULL').orWhere(
            'latestContributionMessage.resubmissionAt <= NOW()',
          )
        }),
      )
  }
  queryBuilder.printSql()
  if (filter.query) {
    const queryString = '%' + filter.query + '%'
    queryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where({ memo: Like(queryString) })
        if (relations?.user) {
          qb.orWhere('user.first_name LIKE :firstName', { firstName: queryString })
            .orWhere('user.last_name LIKE :lastName', { lastName: queryString })
            .orWhere('emailContact.email LIKE :emailContact', { emailContact: queryString })
            .orWhere({ memo: Like(queryString) })
        }
      }),
    )
  }
  return queryBuilder
    .orderBy('Contribution.createdAt', order)
    .addOrderBy('Contribution.id', order)
    .skip((currentPage - 1) * pageSize)
    .take(pageSize)
    .getManyAndCount()
}
