/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Connection } from '@dbTools/typeorm'
import { DltTransaction } from '@entity/DltTransaction'
import { Transaction } from '@entity/Transaction'
import { ApolloServerTestClient } from 'apollo-server-testing'
import { Decimal } from 'decimal.js-light'
// import { GraphQLClient } from 'graphql-request'
// import { Response } from 'graphql-request/dist/types'
import { GraphQLClient } from 'graphql-request'
import { Response } from 'graphql-request/dist/types'

import { testEnvironment, cleanDB } from '@test/helpers'
import { logger, i18n as localization } from '@test/testSetup'

import { CONFIG } from '@/config'
import { TransactionTypeId } from '@/graphql/enum/TransactionTypeId'

import { sendTransactionsToDltConnector } from './sendTransactionsToDltConnector'

/*
// Mock the GraphQLClient
jest.mock('graphql-request', () => {
  const originalModule = jest.requireActual('graphql-request')

  let testCursor = 0

  return {
    __esModule: true,
    ...originalModule,
    GraphQLClient: jest.fn().mockImplementation((url: string) => {
      if (url === 'invalid') {
        throw new Error('invalid url')
      }
      return {
        // why not using mockResolvedValueOnce or mockReturnValueOnce?
        // I have tried, but it didn't work and return every time the first value
        request: jest.fn().mockImplementation(() => {
          testCursor++
          if (testCursor === 4) {
            return Promise.resolve(
              // invalid, is 33 Bytes long as binary
              {
                transmitTransaction: {
                  dltTransactionIdHex:
                    '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516212A',
                },
              },
            )
          } else if (testCursor === 5) {
            throw Error('Connection error')
          } else {
            return Promise.resolve(
              // valid, is 32 Bytes long as binary
              {
                transmitTransaction: {
                  dltTransactionIdHex:
                    '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc51621',
                },
              },
            )
          }
        }),
      }
    }),
  }
})
let mutate: ApolloServerTestClient['mutate'],
  query: ApolloServerTestClient['query'],
  con: Connection
let testEnv: {
  mutate: ApolloServerTestClient['mutate']
  query: ApolloServerTestClient['query']
  con: Connection
}
*/

async function createTxCREATION1(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(1000)
  tx.balance = new Decimal(100)
  tx.balanceDate = new Date('01.01.2023 00:00:00')
  tx.memo = 'txCREATION1'
  tx.typeId = TransactionTypeId.CREATION
  tx.userGradidoID = 'txCREATION1.userGradidoID'
  tx.userId = 1
  tx.userName = 'txCREATION 1'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('01.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516c1'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('01.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}

async function createTxCREATION2(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(1000)
  tx.balance = new Decimal(200)
  tx.balanceDate = new Date('02.01.2023 00:00:00')
  tx.memo = 'txCREATION2'
  tx.typeId = TransactionTypeId.CREATION
  tx.userGradidoID = 'txCREATION2.userGradidoID'
  tx.userId = 2
  tx.userName = 'txCREATION 2'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('02.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516c2'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('02.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}

async function createTxCREATION3(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(1000)
  tx.balance = new Decimal(300)
  tx.balanceDate = new Date('03.01.2023 00:00:00')
  tx.memo = 'txCREATION3'
  tx.typeId = TransactionTypeId.CREATION
  tx.userGradidoID = 'txCREATION3.userGradidoID'
  tx.userId = 3
  tx.userName = 'txCREATION 3'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('03.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516c3'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('03.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}

async function createTxSend1ToReceive2(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(100)
  tx.balance = new Decimal(1000)
  tx.balanceDate = new Date('11.01.2023 00:00:00')
  tx.memo = 'txSEND1 to txRECEIVE2'
  tx.typeId = TransactionTypeId.SEND
  tx.userGradidoID = 'txSEND1.userGradidoID'
  tx.userId = 1
  tx.userName = 'txSEND 1'
  tx.linkedUserGradidoID = 'txRECEIVE2.linkedUserGradidoID'
  tx.linkedUserId = 2
  tx.linkedUserName = 'txRECEIVE 2'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('11.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516a1'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('11.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}

async function createTxReceive2FromSend1(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(100)
  tx.balance = new Decimal(1300)
  tx.balanceDate = new Date('11.01.2023 00:00:00')
  tx.memo = 'txSEND1 to txRECEIVE2'
  tx.typeId = TransactionTypeId.RECEIVE
  tx.userGradidoID = 'txRECEIVE2.linkedUserGradidoID'
  tx.userId = 2
  tx.userName = 'txRECEIVE 2'
  tx.linkedUserGradidoID = 'txSEND1.userGradidoID'
  tx.linkedUserId = 1
  tx.linkedUserName = 'txSEND 1'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('11.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516b2'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('11.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}

/*
async function createTxSend2ToReceive3(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(200)
  tx.balance = new Decimal(1100)
  tx.balanceDate = new Date('23.01.2023 00:00:00')
  tx.memo = 'txSEND2 to txRECEIVE3'
  tx.typeId = TransactionTypeId.SEND
  tx.userGradidoID = 'txSEND2.userGradidoID'
  tx.userId = 2
  tx.userName = 'txSEND 2'
  tx.linkedUserGradidoID = 'txRECEIVE3.linkedUserGradidoID'
  tx.linkedUserId = 3
  tx.linkedUserName = 'txRECEIVE 3'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('23.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516a2'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('23.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}

async function createTxReceive3FromSend2(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(200)
  tx.balance = new Decimal(1500)
  tx.balanceDate = new Date('23.01.2023 00:00:00')
  tx.memo = 'txSEND2 to txRECEIVE3'
  tx.typeId = TransactionTypeId.RECEIVE
  tx.userGradidoID = 'txRECEIVE3.linkedUserGradidoID'
  tx.userId = 3
  tx.userName = 'txRECEIVE 3'
  tx.linkedUserGradidoID = 'txSEND2.userGradidoID'
  tx.linkedUserId = 2
  tx.linkedUserName = 'txSEND 2'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('23.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516b3'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('23.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}

async function createTxSend3ToReceive1(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(300)
  tx.balance = new Decimal(1200)
  tx.balanceDate = new Date('31.01.2023 00:00:00')
  tx.memo = 'txSEND3 to txRECEIVE1'
  tx.typeId = TransactionTypeId.SEND
  tx.userGradidoID = 'txSEND3.userGradidoID'
  tx.userId = 3
  tx.userName = 'txSEND 3'
  tx.linkedUserGradidoID = 'txRECEIVE1.linkedUserGradidoID'
  tx.linkedUserId = 1
  tx.linkedUserName = 'txRECEIVE 1'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('31.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516a3'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('31.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}

async function createTxReceive1FromSend3(verified: boolean): Promise<Transaction> {
  let tx = Transaction.create()
  tx.amount = new Decimal(300)
  tx.balance = new Decimal(1300)
  tx.balanceDate = new Date('31.01.2023 00:00:00')
  tx.memo = 'txSEND3 to txRECEIVE1'
  tx.typeId = TransactionTypeId.RECEIVE
  tx.userGradidoID = 'txRECEIVE1.linkedUserGradidoID'
  tx.userId = 1
  tx.userName = 'txRECEIVE 1'
  tx.linkedUserGradidoID = 'txSEND3.userGradidoID'
  tx.linkedUserId = 3
  tx.linkedUserName = 'txSEND 3'
  tx = await Transaction.save(tx)

  if (verified) {
    const dlttx = DltTransaction.create()
    dlttx.createdAt = new Date('31.01.2023 00:00:10')
    dlttx.messageId = '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516b1'
    dlttx.transactionId = tx.id
    dlttx.verified = true
    dlttx.verifiedAt = new Date('31.01.2023 00:01:10')
    await DltTransaction.save(dlttx)
  }
  return tx
}
*/

let con: Connection
let testEnv: {
  mutate: ApolloServerTestClient['mutate']
  query: ApolloServerTestClient['query']
  con: Connection
}

beforeAll(async () => {
  testEnv = await testEnvironment(logger, localization)
  con = testEnv.con
  await cleanDB()
})

afterAll(async () => {
  await cleanDB()
  await con.close()
})

describe('create and send Transactions to DltConnector', () => {
  let txCREATION1: Transaction
  let txCREATION2: Transaction
  let txCREATION3: Transaction
  let txSEND1to2: Transaction
  let txRECEIVE2From1: Transaction
  // let txSEND2To3: Transaction
  // let txRECEIVE3From2: Transaction
  // let txSEND3To1: Transaction
  // let txRECEIVE1From3: Transaction

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(async () => {
    await cleanDB()
  })

  describe('with 3 creations but inactive dlt-connector', () => {
    it('found 3 dlt-transactions', async () => {
      txCREATION1 = await createTxCREATION1(false)
      txCREATION2 = await createTxCREATION2(false)
      txCREATION3 = await createTxCREATION3(false)

      CONFIG.DLT_CONNECTOR = false
      await sendTransactionsToDltConnector('senderCommunityUuid')
      expect(logger.info).toBeCalledWith('sendTransactionsToDltConnector...')

      // Find the previous created transactions of sendCoin mutation
      const transactions = await Transaction.find({
        // where: { memo: 'unrepeatable memo' },
        order: { balanceDate: 'ASC', id: 'ASC' },
      })

      const dltTransactions = await DltTransaction.find({
        // where: { transactionId: In([transaction[0].id, transaction[1].id]) },
        // relations: ['transaction'],
        order: { createdAt: 'ASC', id: 'ASC' },
      })

      expect(dltTransactions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: transactions[0].id,
            messageId: null,
            verified: false,
            createdAt: expect.any(Date),
            verifiedAt: null,
          }),
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: transactions[1].id,
            messageId: null,
            verified: false,
            createdAt: expect.any(Date),
            verifiedAt: null,
          }),
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: transactions[2].id,
            messageId: null,
            verified: false,
            createdAt: expect.any(Date),
            verifiedAt: null,
          }),
        ]),
      )

      expect(logger.info).nthCalledWith(3, 'sending to DltConnector currently not configured...')
    })
  })

  describe('with 3 creations and active dlt-connector', () => {
    it('found 3 dlt-transactions', async () => {
      txCREATION1 = await createTxCREATION1(false)
      txCREATION2 = await createTxCREATION2(false)
      txCREATION3 = await createTxCREATION3(false)

      CONFIG.DLT_CONNECTOR = true

      // eslint-disable-next-line @typescript-eslint/require-await
      jest.spyOn(GraphQLClient.prototype, 'rawRequest').mockImplementation(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
          data: {
            sendTransaction: {
              dltTransactionIdHex:
                '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc51621',
            },
          },
        } as Response<unknown>
      })

      await sendTransactionsToDltConnector('senderCommunityUuid')

      expect(logger.info).toBeCalledWith('sendTransactionsToDltConnector...')

      // Find the previous created transactions of sendCoin mutation
      const transactions = await Transaction.find({
        // where: { memo: 'unrepeatable memo' },
        order: { balanceDate: 'ASC', id: 'ASC' },
      })

      const dltTransactions = await DltTransaction.find({
        // where: { transactionId: In([transaction[0].id, transaction[1].id]) },
        // relations: ['transaction'],
        order: { createdAt: 'ASC', id: 'ASC' },
      })

      expect(dltTransactions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: transactions[0].id,
            messageId: '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc51621',
            verified: false,
            createdAt: expect.any(Date),
            verifiedAt: null,
          }),
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: transactions[1].id,
            messageId: '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc51621',
            verified: false,
            createdAt: expect.any(Date),
            verifiedAt: null,
          }),
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: transactions[2].id,
            messageId: '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc51621',
            verified: false,
            createdAt: expect.any(Date),
            verifiedAt: null,
          }),
        ]),
      )
    })
  })

  describe('with 3 verified creations, 1 sendCoins and active dlt-connector', () => {
    it('found 3 dlt-transactions', async () => {
      txCREATION1 = await createTxCREATION1(true)
      txCREATION2 = await createTxCREATION2(true)
      txCREATION3 = await createTxCREATION3(true)

      txSEND1to2 = await createTxSend1ToReceive2(false)
      txRECEIVE2From1 = await createTxReceive2FromSend1(false)

      /*
      txSEND2To3 = await createTxSend2ToReceive3()
      txRECEIVE3From2 = await createTxReceive3FromSend2()
      txSEND3To1 = await createTxSend3ToReceive1()
      txRECEIVE1From3 = await createTxReceive1FromSend3()
      */

      CONFIG.DLT_CONNECTOR = true

      // eslint-disable-next-line @typescript-eslint/require-await
      jest.spyOn(GraphQLClient.prototype, 'rawRequest').mockImplementation(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
          data: {
            sendTransaction: {
              dltTransactionIdHex:
                '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc51621',
            },
          },
        } as Response<unknown>
      })

      await sendTransactionsToDltConnector('senderCommunityUuid')

      expect(logger.info).toBeCalledWith('sendTransactionsToDltConnector...')

      // Find the previous created transactions of sendCoin mutation
      /*
      const transactions = await Transaction.find({
        // where: { memo: 'unrepeatable memo' },
        order: { balanceDate: 'ASC', id: 'ASC' },
      })
      */

      const dltTransactions = await DltTransaction.find({
        // where: { transactionId: In([transaction[0].id, transaction[1].id]) },
        // relations: ['transaction'],
        order: { createdAt: 'ASC', id: 'ASC' },
      })

      expect(dltTransactions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: txCREATION1.id,
            messageId: '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516c1',
            verified: true,
            createdAt: new Date('01.01.2023 00:00:10'),
            verifiedAt: new Date('01.01.2023 00:01:10'),
          }),
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: txCREATION2.id,
            messageId: '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516c2',
            verified: true,
            createdAt: new Date('02.01.2023 00:00:10'),
            verifiedAt: new Date('02.01.2023 00:01:10'),
          }),
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: txCREATION3.id,
            messageId: '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc516c3',
            verified: true,
            createdAt: new Date('03.01.2023 00:00:10'),
            verifiedAt: new Date('03.01.2023 00:01:10'),
          }),
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: txSEND1to2.id,
            messageId: '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc51621',
            verified: false,
            createdAt: expect.any(Date),
            verifiedAt: null,
          }),
          expect.objectContaining({
            id: expect.any(Number),
            transactionId: txRECEIVE2From1.id,
            messageId: '723e3fab62c5d3e2f62fd72ba4e622bcd53eff35262e3f3526327fe41bc51621',
            verified: false,
            createdAt: expect.any(Date),
            verifiedAt: null,
          }),
        ]),
      )
    })
    /*
    describe('with one Community of api 1_0 and not matching pubKey', () => {
      beforeEach(async () => {
        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(GraphQLClient.prototype, 'rawRequest').mockImplementation(async () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return {
            data: {
              getPublicKey: {
                publicKey: 'somePubKey',
              },
            },
          } as Response<unknown>
        })
        const variables1 = {
          publicKey: Buffer.from('11111111111111111111111111111111'),
          apiVersion: '1_0',
          endPoint: 'http//localhost:5001/api/',
          lastAnnouncedAt: new Date(),
        }
        await DbFederatedCommunity.createQueryBuilder()
          .insert()
          .into(DbFederatedCommunity)
          .values(variables1)
          .orUpdate({
            // eslint-disable-next-line camelcase
            conflict_target: ['id', 'publicKey', 'apiVersion'],
            overwrite: ['end_point', 'last_announced_at'],
          })
          .execute()

        jest.clearAllMocks()
        // await validateCommunities()
      })

      it('logs one community found', () => {
        expect(logger.debug).toBeCalledWith(`Federation: found 1 dbCommunities`)
      })
      it('logs requestGetPublicKey for community api 1_0 ', () => {
        expect(logger.info).toBeCalledWith(
          'Federation: getPublicKey from endpoint',
          'http//localhost:5001/api/1_0/',
        )
      })
      it('logs not matching publicKeys', () => {
        expect(logger.warn).toBeCalledWith(
          'Federation: received not matching publicKey:',
          'somePubKey',
          expect.stringMatching('11111111111111111111111111111111'),
        )
      })
    })
    describe('with one Community of api 1_0 and matching pubKey', () => {
      beforeEach(async () => {
        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(GraphQLClient.prototype, 'rawRequest').mockImplementation(async () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return {
            data: {
              getPublicKey: {
                publicKey: '11111111111111111111111111111111',
              },
            },
          } as Response<unknown>
        })
        const variables1 = {
          publicKey: Buffer.from('11111111111111111111111111111111'),
          apiVersion: '1_0',
          endPoint: 'http//localhost:5001/api/',
          lastAnnouncedAt: new Date(),
        }
        await DbFederatedCommunity.createQueryBuilder()
          .insert()
          .into(DbFederatedCommunity)
          .values(variables1)
          .orUpdate({
            // eslint-disable-next-line camelcase
            conflict_target: ['id', 'publicKey', 'apiVersion'],
            overwrite: ['end_point', 'last_announced_at'],
          })
          .execute()
        await DbFederatedCommunity.update({}, { verifiedAt: null })
        jest.clearAllMocks()
        // await validateCommunities()
      })

      it('logs one community found', () => {
        expect(logger.debug).toBeCalledWith(`Federation: found 1 dbCommunities`)
      })
      it('logs requestGetPublicKey for community api 1_0 ', () => {
        expect(logger.info).toBeCalledWith(
          'Federation: getPublicKey from endpoint',
          'http//localhost:5001/api/1_0/',
        )
      })
      it('logs community pubKey verified', () => {
        expect(logger.info).toHaveBeenNthCalledWith(
          3,
          'Federation: verified community with',
          'http//localhost:5001/api/',
        )
      })
    })
    describe('with two Communities of api 1_0 and 1_1', () => {
      beforeEach(async () => {
        jest.clearAllMocks()
        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(GraphQLClient.prototype, 'rawRequest').mockImplementation(async () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return {
            data: {
              getPublicKey: {
                publicKey: '11111111111111111111111111111111',
              },
            },
          } as Response<unknown>
        })
        const variables2 = {
          publicKey: Buffer.from('11111111111111111111111111111111'),
          apiVersion: '1_1',
          endPoint: 'http//localhost:5001/api/',
          lastAnnouncedAt: new Date(),
        }
        await DbFederatedCommunity.createQueryBuilder()
          .insert()
          .into(DbFederatedCommunity)
          .values(variables2)
          .orUpdate({
            // eslint-disable-next-line camelcase
            conflict_target: ['id', 'publicKey', 'apiVersion'],
            overwrite: ['end_point', 'last_announced_at'],
          })
          .execute()

        await DbFederatedCommunity.update({}, { verifiedAt: null })
        jest.clearAllMocks()
        // await validateCommunities()
      })
      it('logs two communities found', () => {
        expect(logger.debug).toBeCalledWith(`Federation: found 2 dbCommunities`)
      })
      it('logs requestGetPublicKey for community api 1_0 ', () => {
        expect(logger.info).toBeCalledWith(
          'Federation: getPublicKey from endpoint',
          'http//localhost:5001/api/1_0/',
        )
      })
      it('logs requestGetPublicKey for community api 1_1 ', () => {
        expect(logger.info).toBeCalledWith(
          'Federation: getPublicKey from endpoint',
          'http//localhost:5001/api/1_1/',
        )
      })
    })
    describe('with three Communities of api 1_0, 1_1 and 2_0', () => {
      let dbCom: DbFederatedCommunity
      beforeEach(async () => {
        const variables3 = {
          publicKey: Buffer.from('11111111111111111111111111111111'),
          apiVersion: '2_0',
          endPoint: 'http//localhost:5001/api/',
          lastAnnouncedAt: new Date(),
        }
        await DbFederatedCommunity.createQueryBuilder()
          .insert()
          .into(DbFederatedCommunity)
          .values(variables3)
          .orUpdate({
            // eslint-disable-next-line camelcase
            conflict_target: ['id', 'publicKey', 'apiVersion'],
            overwrite: ['end_point', 'last_announced_at'],
          })
          .execute()
        dbCom = await DbFederatedCommunity.findOneOrFail({
          where: { publicKey: variables3.publicKey, apiVersion: variables3.apiVersion },
        })
        await DbFederatedCommunity.update({}, { verifiedAt: null })
        jest.clearAllMocks()
        // await validateCommunities()
      })
      it('logs three community found', () => {
        expect(logger.debug).toBeCalledWith(`Federation: found 3 dbCommunities`)
      })
      it('logs requestGetPublicKey for community api 1_0 ', () => {
        expect(logger.info).toBeCalledWith(
          'Federation: getPublicKey from endpoint',
          'http//localhost:5001/api/1_0/',
        )
      })
      it('logs requestGetPublicKey for community api 1_1 ', () => {
        expect(logger.info).toBeCalledWith(
          'Federation: getPublicKey from endpoint',
          'http//localhost:5001/api/1_1/',
        )
      })
      it('logs unsupported api for community with api 2_0 ', () => {
        expect(logger.warn).toBeCalledWith(
          'Federation: dbCom with unsupported apiVersion',
          dbCom.endPoint,
          '2_0',
        )
      })
    })
    */
  })
})
