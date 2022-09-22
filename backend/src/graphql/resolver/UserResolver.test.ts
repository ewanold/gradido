/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { testEnvironment, headerPushMock, resetToken, cleanDB, resetEntity } from '@test/helpers'
import { userFactory } from '@/seeds/factory/user'
import { bibiBloxberg } from '@/seeds/users/bibi-bloxberg'
import {
  createUser,
  setPassword,
  forgotPassword,
  updateUserInfos,
  createContribution,
  confirmContribution,
} from '@/seeds/graphql/mutations'
import { login, logout, verifyLogin, queryOptIn, searchAdminUsers } from '@/seeds/graphql/queries'
import { GraphQLError } from 'graphql'
import { LoginEmailOptIn } from '@entity/LoginEmailOptIn'
import { User } from '@entity/User'
import CONFIG from '@/config'
import { sendAccountActivationEmail } from '@/mailer/sendAccountActivationEmail'
import { sendAccountMultiRegistrationEmail } from '@/mailer/sendAccountMultiRegistrationEmail'
import { sendResetPasswordEmail } from '@/mailer/sendResetPasswordEmail'
import { printTimeDuration, activationLink } from './UserResolver'
import { contributionLinkFactory } from '@/seeds/factory/contributionLink'
import { transactionLinkFactory } from '@/seeds/factory/transactionLink'
import { ContributionLink } from '@model/ContributionLink'
import { TransactionLink } from '@entity/TransactionLink'

import { EventProtocolType } from '@/event/EventProtocolType'
import { EventProtocol } from '@entity/EventProtocol'
import { logger } from '@test/testSetup'
import { validate as validateUUID, version as versionUUID } from 'uuid'
import { peterLustig } from '@/seeds/users/peter-lustig'
import { bobBaumeister } from '@/seeds/users/bob-baumeister'

// import { klicktippSignIn } from '@/apis/KlicktippController'

jest.mock('@/mailer/sendAccountActivationEmail', () => {
  return {
    __esModule: true,
    sendAccountActivationEmail: jest.fn(),
  }
})

jest.mock('@/mailer/sendAccountMultiRegistrationEmail', () => {
  return {
    __esModule: true,
    sendAccountMultiRegistrationEmail: jest.fn(),
  }
})

jest.mock('@/mailer/sendResetPasswordEmail', () => {
  return {
    __esModule: true,
    sendResetPasswordEmail: jest.fn(),
  }
})

/*
jest.mock('@/apis/KlicktippController', () => {
  return {
    __esModule: true,
    klicktippSignIn: jest.fn(),
  }
})
*/

let mutate: any, query: any, con: any
let testEnv: any

beforeAll(async () => {
  testEnv = await testEnvironment(logger)
  mutate = testEnv.mutate
  query = testEnv.query
  con = testEnv.con
  await cleanDB()
})

afterAll(async () => {
  await cleanDB()
  await con.close()
})

describe('UserResolver', () => {
  describe('createUser', () => {
    const variables = {
      email: 'peter@lustig.de',
      firstName: 'Peter',
      lastName: 'Lustig',
      language: 'de',
      publisherId: 1234,
    }

    let result: any
    let emailOptIn: string
    let user: User[]

    beforeAll(async () => {
      jest.clearAllMocks()
      result = await mutate({ mutation: createUser, variables })
    })

    afterAll(async () => {
      await cleanDB()
    })

    it('returns success', () => {
      expect(result).toEqual(
        expect.objectContaining({ data: { createUser: { id: expect.any(Number) } } }),
      )
    })

    describe('valid input data', () => {
      let loginEmailOptIn: LoginEmailOptIn[]
      beforeAll(async () => {
        user = await User.find()
        loginEmailOptIn = await LoginEmailOptIn.find()
        emailOptIn = loginEmailOptIn[0].verificationCode.toString()
      })

      describe('filling all tables', () => {
        it('saves the user in users table', () => {
          expect(user).toEqual([
            {
              id: expect.any(Number),
              gradidoID: expect.any(String),
              alias: null,
              email: 'peter@lustig.de',
              firstName: 'Peter',
              lastName: 'Lustig',
              password: '0',
              pubKey: null,
              privKey: null,
              emailHash: expect.any(Buffer),
              createdAt: expect.any(Date),
              emailChecked: false,
              passphrase: expect.any(String),
              language: 'de',
              isAdmin: null,
              deletedAt: null,
              publisherId: 1234,
              referrerId: null,
              contributionLinkId: null,
            },
          ])
          const valUUID = validateUUID(user[0].gradidoID)
          const verUUID = versionUUID(user[0].gradidoID)
          expect(valUUID).toEqual(true)
          expect(verUUID).toEqual(4)
        })

        it('creates an email optin', () => {
          expect(loginEmailOptIn).toEqual([
            {
              id: expect.any(Number),
              userId: user[0].id,
              verificationCode: expect.any(String),
              emailOptInTypeId: 1,
              createdAt: expect.any(Date),
              resendCount: 0,
              updatedAt: expect.any(Date),
            },
          ])
        })
      })
    })

    describe('account activation email', () => {
      it('sends an account activation email', () => {
        const activationLink = CONFIG.EMAIL_LINK_VERIFICATION.replace(
          /{optin}/g,
          emailOptIn,
        ).replace(/{code}/g, '')
        expect(sendAccountActivationEmail).toBeCalledWith({
          link: activationLink,
          firstName: 'Peter',
          lastName: 'Lustig',
          email: 'peter@lustig.de',
          duration: expect.any(String),
        })
      })

      it('stores the send confirmation event in the database', () => {
        expect(EventProtocol.find()).resolves.toContainEqual(
          expect.objectContaining({
            type: EventProtocolType.SEND_CONFIRMATION_EMAIL,
            userId: user[0].id,
          }),
        )
      })
    })

    describe('email already exists', () => {
      let mutation: User
      beforeAll(async () => {
        mutation = await mutate({ mutation: createUser, variables })
      })

      it('logs an info', async () => {
        expect(logger.info).toBeCalledWith('User already exists with this email=peter@lustig.de')
      })

      it('sends an account multi registration email', () => {
        expect(sendAccountMultiRegistrationEmail).toBeCalledWith({
          firstName: 'Peter',
          lastName: 'Lustig',
          email: 'peter@lustig.de',
        })
      })

      it('results with partly faked user with random "id"', async () => {
        expect(mutation).toEqual(
          expect.objectContaining({
            data: {
              createUser: {
                id: expect.any(Number),
              },
            },
          }),
        )
      })
    })

    describe('unknown language', () => {
      it('sets "de" as default language', async () => {
        await mutate({
          mutation: createUser,
          variables: { ...variables, email: 'bibi@bloxberg.de', language: 'it' },
        })
        await expect(User.find()).resolves.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              email: 'bibi@bloxberg.de',
              language: 'de',
            }),
          ]),
        )
      })
    })

    describe('no publisher id', () => {
      it('sets publisher id to null', async () => {
        await mutate({
          mutation: createUser,
          variables: { ...variables, email: 'raeuber@hotzenplotz.de', publisherId: undefined },
        })
        await expect(User.find()).resolves.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              email: 'raeuber@hotzenplotz.de',
              publisherId: null,
            }),
          ]),
        )
      })
    })

    describe('redeem codes', () => {
      let result: any
      let link: ContributionLink

      describe('contribution link', () => {
        beforeAll(async () => {
          // activate account of admin Peter Lustig
          await mutate({
            mutation: setPassword,
            variables: { code: emailOptIn, password: 'Aa12345_' },
          })

          // make Peter Lustig Admin
          const peter = await User.findOneOrFail({ id: user[0].id })
          peter.isAdmin = new Date()
          await peter.save()

          // date statement
          const actualDate = new Date()
          const futureDate = new Date() // Create a future day from the executed day
          futureDate.setDate(futureDate.getDate() + 1)

          // factory logs in as Peter Lustig
          link = await contributionLinkFactory(testEnv, {
            name: 'Dokumenta 2022',
            memo: 'Vielen Dank für deinen Besuch bei der Dokumenta 2022',
            amount: 200,
            validFrom: actualDate,
            validTo: futureDate,
          })

          resetToken()
          result = await mutate({
            mutation: createUser,
            variables: { ...variables, email: 'ein@besucher.de', redeemCode: 'CL-' + link.code },
          })
        })

        afterAll(async () => {
          await cleanDB()
        })

        it('sets the contribution link id', async () => {
          await expect(User.findOne({ email: 'ein@besucher.de' })).resolves.toEqual(
            expect.objectContaining({
              contributionLinkId: link.id,
            }),
          )
        })

        it('stores the account activated event in the database', () => {
          expect(EventProtocol.find()).resolves.toContainEqual(
            expect.objectContaining({
              type: EventProtocolType.ACTIVATE_ACCOUNT,
              userId: user[0].id,
            }),
          )
        })

        it('stores the redeem register event in the database', () => {
          expect(EventProtocol.find()).resolves.toContainEqual(
            expect.objectContaining({
              type: EventProtocolType.REDEEM_REGISTER,
              userId: result.data.createUser.id,
              contributionId: link.id,
            }),
          )
        })
      })

      describe('transaction link', () => {
        let contribution: any
        let bob: any
        let transactionLink: TransactionLink
        let newUser: any

        const bobData = {
          email: 'bob@baumeister.de',
          password: 'Aa12345_',
          publisherId: 1234,
        }

        const peterData = {
          email: 'peter@lustig.de',
          password: 'Aa12345_',
          publisherId: 1234,
        }

        beforeAll(async () => {
          await userFactory(testEnv, peterLustig)
          await userFactory(testEnv, bobBaumeister)
          await query({ query: login, variables: bobData })

          // create contribution as user bob
          contribution = await mutate({
            mutation: createContribution,
            variables: { amount: 1000, memo: 'testing', creationDate: new Date().toISOString() },
          })

          // login as admin
          await query({ query: login, variables: peterData })

          // confirm the contribution
          contribution = await mutate({
            mutation: confirmContribution,
            variables: { id: contribution.data.createContribution.id },
          })

          // login as user bob
          bob = await query({ query: login, variables: bobData })

          // create transaction link
          await transactionLinkFactory(testEnv, {
            email: 'bob@baumeister.de',
            amount: 19.99,
            memo: `testing transaction link`,
          })

          transactionLink = await TransactionLink.findOneOrFail()

          resetToken()

          // create new user using transaction link of bob
          newUser = await mutate({
            mutation: createUser,
            variables: {
              ...variables,
              email: 'which@ever.de',
              redeemCode: transactionLink.code,
            },
          })
        })

        it('sets the referrer id to bob baumeister id', async () => {
          await expect(User.findOne({ email: 'which@ever.de' })).resolves.toEqual(
            expect.objectContaining({ referrerId: bob.data.login.id }),
          )
        })

        it('stores the redeem register event in the database', async () => {
          await expect(EventProtocol.find()).resolves.toContainEqual(
            expect.objectContaining({
              type: EventProtocolType.REDEEM_REGISTER,
              userId: newUser.data.createUser.id,
            }),
          )
        })
      })

      /* A transaction link requires GDD on account
      describe('transaction link', () => {
        let code: string
        beforeAll(async () => {
          // factory logs in as Peter Lustig
          await transactionLinkFactory(testEnv, {
            email: 'peter@lustig.de',
            amount: 19.99,
            memo: `Kein Trick, keine Zauberrei,
bei Gradidio sei dabei!`,
          })
          const transactionLink = await TransactionLink.findOneOrFail()
          resetToken()
          await mutate({
            mutation: createUser,
            variables: { ...variables, email: 'neuer@user.de', redeemCode: transactionLink.code },
          })          
        })

        it('sets the referrer id to Peter Lustigs id', async () => {
          await expect(User.findOne({ email: 'neuer@user.de' })).resolves.toEqual(expect.objectContaining({
            referrerId: user[0].id,
          }))
        })
      })

      */
    })
  })

  describe('setPassword', () => {
    const createUserVariables = {
      email: 'peter@lustig.de',
      firstName: 'Peter',
      lastName: 'Lustig',
      language: 'de',
      publisherId: 1234,
    }

    let result: any
    let emailOptIn: string

    describe('valid optin code and valid password', () => {
      let newUser: any

      beforeAll(async () => {
        await mutate({ mutation: createUser, variables: createUserVariables })
        const loginEmailOptIn = await LoginEmailOptIn.find()
        emailOptIn = loginEmailOptIn[0].verificationCode.toString()
        result = await mutate({
          mutation: setPassword,
          variables: { code: emailOptIn, password: 'Aa12345_' },
        })
        newUser = await User.find()
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('sets email checked to true', () => {
        expect(newUser[0].emailChecked).toBeTruthy()
      })

      it('updates the password', () => {
        expect(newUser[0].password).toEqual('3917921995996627700')
      })

      /*
      it('calls the klicktipp API', () => {
        expect(klicktippSignIn).toBeCalledWith(
          user[0].email,
          user[0].language,
          user[0].firstName,
          user[0].lastName,
        )
      })
      */

      it('returns true', () => {
        expect(result).toBeTruthy()
      })
    })

    describe('no valid password', () => {
      beforeAll(async () => {
        await mutate({ mutation: createUser, variables: createUserVariables })
        const loginEmailOptIn = await LoginEmailOptIn.find()
        emailOptIn = loginEmailOptIn[0].verificationCode.toString()
        result = await mutate({
          mutation: setPassword,
          variables: { code: emailOptIn, password: 'not-valid' },
        })
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('throws an error', () => {
        expect(result).toEqual(
          expect.objectContaining({
            errors: [
              new GraphQLError(
                'Please enter a valid password with at least 8 characters, upper and lower case letters, at least one number and one special character!',
              ),
            ],
          }),
        )
      })

      it('logs the error thrown', () => {
        expect(logger.error).toBeCalledWith('Password entered is lexically invalid')
      })
    })

    describe('no valid optin code', () => {
      beforeAll(async () => {
        await mutate({ mutation: createUser, variables: createUserVariables })
        result = await mutate({
          mutation: setPassword,
          variables: { code: 'not valid', password: 'Aa12345_' },
        })
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('throws an error', () => {
        expect(result).toEqual(
          expect.objectContaining({
            errors: [new GraphQLError('Could not login with emailVerificationCode')],
          }),
        )
      })

      it('logs the error found', () => {
        expect(logger.error).toBeCalledWith('Could not login with emailVerificationCode')
      })
    })
  })

  describe('login', () => {
    const variables = {
      email: 'bibi@bloxberg.de',
      password: 'Aa12345_',
      publisherId: 1234,
    }

    let result: User

    afterAll(async () => {
      await cleanDB()
    })

    describe('no users in database', () => {
      beforeAll(async () => {
        result = await query({ query: login, variables })
      })

      it('throws an error', () => {
        expect(result).toEqual(
          expect.objectContaining({
            errors: [new GraphQLError('No user with this credentials')],
          }),
        )
      })

      it('logs the error found', () => {
        expect(logger.error).toBeCalledWith('User with email=bibi@bloxberg.de does not exist')
      })
    })

    describe('user is in database and correct login data', () => {
      beforeAll(async () => {
        await userFactory(testEnv, bibiBloxberg)
        result = await query({ query: login, variables })
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('returns the user object', () => {
        expect(result).toEqual(
          expect.objectContaining({
            data: {
              login: {
                email: 'bibi@bloxberg.de',
                firstName: 'Bibi',
                hasElopage: false,
                id: expect.any(Number),
                isAdmin: null,
                klickTipp: {
                  newsletterState: false,
                },
                language: 'de',
                lastName: 'Bloxberg',
                publisherId: 1234,
              },
            },
          }),
        )
      })

      it('sets the token in the header', () => {
        expect(headerPushMock).toBeCalledWith({ key: 'token', value: expect.any(String) })
      })
    })

    describe('user is in database and wrong password', () => {
      beforeAll(async () => {
        await userFactory(testEnv, bibiBloxberg)
        result = await query({ query: login, variables: { ...variables, password: 'wrong' } })
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('returns an error', () => {
        expect(result).toEqual(
          expect.objectContaining({
            errors: [new GraphQLError('No user with this credentials')],
          }),
        )
      })

      it('logs the error thrown', () => {
        expect(logger.error).toBeCalledWith('The User has no valid credentials.')
      })
    })
  })

  describe('logout', () => {
    describe('unauthenticated', () => {
      it('throws an error', async () => {
        resetToken()
        await expect(query({ query: logout })).resolves.toEqual(
          expect.objectContaining({
            errors: [new GraphQLError('401 Unauthorized')],
          }),
        )
      })
    })

    describe('authenticated', () => {
      const variables = {
        email: 'bibi@bloxberg.de',
        password: 'Aa12345_',
      }

      beforeAll(async () => {
        await userFactory(testEnv, bibiBloxberg)
        await query({ query: login, variables })
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('returns true', async () => {
        await expect(query({ query: logout })).resolves.toEqual(
          expect.objectContaining({
            data: { logout: 'true' },
            errors: undefined,
          }),
        )
      })
    })
  })

  describe('verifyLogin', () => {
    describe('unauthenticated', () => {
      it('throws an error', async () => {
        resetToken()
        await expect(query({ query: verifyLogin })).resolves.toEqual(
          expect.objectContaining({
            errors: [new GraphQLError('401 Unauthorized')],
          }),
        )
      })
    })

    describe('user exists but is not logged in', () => {
      beforeAll(async () => {
        await userFactory(testEnv, bibiBloxberg)
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('throws an error', async () => {
        resetToken()
        await expect(query({ query: verifyLogin })).resolves.toEqual(
          expect.objectContaining({
            errors: [new GraphQLError('401 Unauthorized')],
          }),
        )
      })

      describe('authenticated', () => {
        let user: User[]

        const variables = {
          email: 'bibi@bloxberg.de',
          password: 'Aa12345_',
        }

        beforeAll(async () => {
          await query({ query: login, variables })
          user = await User.find()
        })

        afterAll(() => {
          resetToken()
        })

        it('returns user object', async () => {
          await expect(query({ query: verifyLogin })).resolves.toEqual(
            expect.objectContaining({
              data: {
                verifyLogin: {
                  email: 'bibi@bloxberg.de',
                  firstName: 'Bibi',
                  lastName: 'Bloxberg',
                  language: 'de',
                  klickTipp: {
                    newsletterState: false,
                  },
                  hasElopage: false,
                  publisherId: 1234,
                  isAdmin: null,
                },
              },
            }),
          )
        })

        it('stores the login event in the database', () => {
          expect(EventProtocol.find()).resolves.toContainEqual(
            expect.objectContaining({
              type: EventProtocolType.LOGIN,
              userId: user[0].id,
            }),
          )
        })
      })
    })
  })

  describe('forgotPassword', () => {
    const variables = { email: 'bibi@bloxberg.de' }
    describe('user is not in DB', () => {
      it('returns true', async () => {
        await expect(mutate({ mutation: forgotPassword, variables })).resolves.toEqual(
          expect.objectContaining({
            data: {
              forgotPassword: true,
            },
          }),
        )
      })
    })

    describe('user exists in DB', () => {
      let result: any
      let loginEmailOptIn: LoginEmailOptIn[]

      beforeAll(async () => {
        await userFactory(testEnv, bibiBloxberg)
        await resetEntity(LoginEmailOptIn)
        result = await mutate({ mutation: forgotPassword, variables })
        loginEmailOptIn = await LoginEmailOptIn.find()
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('returns true', async () => {
        await expect(result).toEqual(
          expect.objectContaining({
            data: {
              forgotPassword: true,
            },
          }),
        )
      })

      it('sends reset password email', () => {
        expect(sendResetPasswordEmail).toBeCalledWith({
          link: activationLink(loginEmailOptIn[0]),
          firstName: 'Bibi',
          lastName: 'Bloxberg',
          email: 'bibi@bloxberg.de',
          duration: expect.any(String),
        })
      })

      describe('request reset password again', () => {
        it('throws an error', async () => {
          await expect(mutate({ mutation: forgotPassword, variables })).resolves.toEqual(
            expect.objectContaining({
              errors: [new GraphQLError('email already sent less than 10 minutes minutes ago')],
            }),
          )
        })

        it('logs the error found', () => {
          expect(logger.error).toBeCalledWith(`email already sent less than 10 minutes minutes ago`)
        })
      })
    })
  })

  describe('queryOptIn', () => {
    let loginEmailOptIn: LoginEmailOptIn[]

    beforeAll(async () => {
      await userFactory(testEnv, bibiBloxberg)
      loginEmailOptIn = await LoginEmailOptIn.find()
    })

    afterAll(async () => {
      await cleanDB()
    })

    describe('wrong optin code', () => {
      it('throws an error', async () => {
        await expect(
          query({ query: queryOptIn, variables: { optIn: 'not-valid' } }),
        ).resolves.toEqual(
          expect.objectContaining({
            errors: [
              // keep Whitspace in error message!
              new GraphQLError(`Could not find any entity of type "LoginEmailOptIn" matching: {
    "verificationCode": "not-valid"
}`),
            ],
          }),
        )
      })
    })

    describe('correct optin code', () => {
      it('returns true', async () => {
        await expect(
          query({
            query: queryOptIn,
            variables: { optIn: loginEmailOptIn[0].verificationCode.toString() },
          }),
        ).resolves.toEqual(
          expect.objectContaining({
            data: {
              queryOptIn: true,
            },
          }),
        )
      })
    })
  })

  describe('updateUserInfos', () => {
    describe('unauthenticated', () => {
      it('throws an error', async () => {
        resetToken()
        await expect(mutate({ mutation: updateUserInfos })).resolves.toEqual(
          expect.objectContaining({
            errors: [new GraphQLError('401 Unauthorized')],
          }),
        )
      })
    })

    describe('authenticated', () => {
      beforeAll(async () => {
        await userFactory(testEnv, bibiBloxberg)
        await query({
          query: login,
          variables: {
            email: 'bibi@bloxberg.de',
            password: 'Aa12345_',
          },
        })
      })

      afterAll(async () => {
        await cleanDB()
      })

      it('returns true', async () => {
        await expect(mutate({ mutation: updateUserInfos })).resolves.toEqual(
          expect.objectContaining({
            data: {
              updateUserInfos: true,
            },
          }),
        )
      })

      describe('first-name, last-name and language', () => {
        it('updates the fields in DB', async () => {
          await mutate({
            mutation: updateUserInfos,
            variables: {
              firstName: 'Benjamin',
              lastName: 'Blümchen',
              locale: 'en',
            },
          })
          await expect(User.findOne()).resolves.toEqual(
            expect.objectContaining({
              firstName: 'Benjamin',
              lastName: 'Blümchen',
              language: 'en',
            }),
          )
        })
      })

      describe('language is not valid', () => {
        it('throws an error', async () => {
          await expect(
            mutate({
              mutation: updateUserInfos,
              variables: {
                locale: 'not-valid',
              },
            }),
          ).resolves.toEqual(
            expect.objectContaining({
              errors: [new GraphQLError(`"not-valid" isn't a valid language`)],
            }),
          )
        })

        it('logs the error found', () => {
          expect(logger.error).toBeCalledWith(`"not-valid" isn't a valid language`)
        })
      })

      describe('password', () => {
        describe('wrong old password', () => {
          it('throws an error', async () => {
            await expect(
              mutate({
                mutation: updateUserInfos,
                variables: {
                  password: 'wrong password',
                  passwordNew: 'Aa12345_',
                },
              }),
            ).resolves.toEqual(
              expect.objectContaining({
                errors: [new GraphQLError('Old password is invalid')],
              }),
            )
          })

          it('logs the error found', () => {
            expect(logger.error).toBeCalledWith(`Old password is invalid`)
          })
        })

        describe('invalid new password', () => {
          it('throws an error', async () => {
            await expect(
              mutate({
                mutation: updateUserInfos,
                variables: {
                  password: 'Aa12345_',
                  passwordNew: 'Aa12345',
                },
              }),
            ).resolves.toEqual(
              expect.objectContaining({
                errors: [
                  new GraphQLError(
                    'Please enter a valid password with at least 8 characters, upper and lower case letters, at least one number and one special character!',
                  ),
                ],
              }),
            )
          })

          it('logs the error found', () => {
            expect(logger.error).toBeCalledWith('newPassword does not fullfil the rules')
          })
        })

        describe('correct old and new password', () => {
          it('returns true', async () => {
            await expect(
              mutate({
                mutation: updateUserInfos,
                variables: {
                  password: 'Aa12345_',
                  passwordNew: 'Bb12345_',
                },
              }),
            ).resolves.toEqual(
              expect.objectContaining({
                data: { updateUserInfos: true },
              }),
            )
          })

          it('can login with new password', async () => {
            await expect(
              query({
                query: login,
                variables: {
                  email: 'bibi@bloxberg.de',
                  password: 'Bb12345_',
                },
              }),
            ).resolves.toEqual(
              expect.objectContaining({
                data: {
                  login: expect.objectContaining({
                    email: 'bibi@bloxberg.de',
                  }),
                },
              }),
            )
          })

          it('cannot login with old password', async () => {
            await expect(
              query({
                query: login,
                variables: {
                  email: 'bibi@bloxberg.de',
                  password: 'Aa12345_',
                },
              }),
            ).resolves.toEqual(
              expect.objectContaining({
                errors: [new GraphQLError('No user with this credentials')],
              }),
            )
          })

          it('logs the error thrown', () => {
            expect(logger.error).toBeCalledWith('The User has no valid credentials.')
          })
        })
      })
    })
  })

  describe('searchAdminUsers', () => {
    describe('unauthenticated', () => {
      it('throws an error', async () => {
        resetToken()
        await expect(mutate({ mutation: searchAdminUsers })).resolves.toEqual(
          expect.objectContaining({
            errors: [new GraphQLError('401 Unauthorized')],
          }),
        )
      })
    })

    describe('authenticated', () => {
      beforeAll(async () => {
        await userFactory(testEnv, bibiBloxberg)
        await userFactory(testEnv, peterLustig)
        await query({
          query: login,
          variables: {
            email: 'bibi@bloxberg.de',
            password: 'Aa12345_',
          },
        })
      })

      it('finds peter@lustig.de', async () => {
        await expect(mutate({ mutation: searchAdminUsers })).resolves.toEqual(
          expect.objectContaining({
            data: {
              searchAdminUsers: {
                userCount: 1,
                userList: expect.arrayContaining([
                  expect.objectContaining({
                    firstName: 'Peter',
                    lastName: 'Lustig',
                  }),
                ]),
              },
            },
          }),
        )
      })
    })
  })
})

describe('printTimeDuration', () => {
  it('works with 10 minutes', () => {
    expect(printTimeDuration(10)).toBe('10 minutes')
  })

  it('works with 1440 minutes', () => {
    expect(printTimeDuration(1440)).toBe('24 hours')
  })

  it('works with 1410 minutes', () => {
    expect(printTimeDuration(1410)).toBe('23 hours and 30 minutes')
  })
})
