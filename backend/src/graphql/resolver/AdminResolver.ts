import { Resolver, Query, Arg, Args } from 'type-graphql'
import { getCustomRepository } from 'typeorm'
import { UserAdmin } from '../model/UserAdmin'
import { LoginUserRepository } from '../../typeorm/repository/LoginUser'
import { TransactionCreationRepository } from '../../typeorm/repository/TransactionCreation'
import { UserRepository } from '../../typeorm/repository/User'
import CreatePendingCreationArgs from '../arg/CreatePendingCreationArgs'

@Resolver()
export class AdminResolver {
  @Query(() => [UserAdmin])
  async searchUsers(@Arg('searchText') searchText: string): Promise<UserAdmin[]> {
    const loginUserRepository = getCustomRepository(LoginUserRepository)
    const loginUsers = await loginUserRepository.findBySearchCriteria(searchText)
    const users = loginUsers.map((loginUser) => {
      const user = new UserAdmin()
      user.firstName = loginUser.firstName
      user.lastName = loginUser.lastName
      user.email = loginUser.email
      user.creation = getUserCreations(loginUser.id)
      return user
    })
    return users
  }

  @Query(() => Boolean)
  async createPendingCreation(
    @Args() { email, amount, note, creationDate }: CreatePendingCreationArgs,
  ): Promise<boolean> {
    // TODO: Check user validity
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findByEmail(email)
    // TODO: Check user open creation state (Open creation)
    const creations = await getUserCreations(user.id)
    console.log('creations', creations)
    if (isCreationValid(creations, amount, creationDate)) {
      // UserAdmin.creations()
      // TODO: Write pending creation to DB
    }
    return false
  }
}

function getUserCreations(id: number): number[] {
  // SELECT count(amount) FROM transaction_creations WHERE state_user_id = id AND target_date > (NOW()-ActualDays - 2 Monate)
  const transactionCreations = await getCustomRepository(TransactionCreationRepository).find({
    currentDate: Raw((alias) => `${alias} > :date`, { date: "2021-09-01" /* TODO: NOW().format("YYYY-MM") + '-01' */ }),
  })
  // SELECT * FROM pending_creations WHERE userId = id
  // COUNT amount from 2 tables
  // if amount < 3000 => Store in pending_creations
  return [
    (Math.floor(Math.random() * 50) + 1) * 20,
    (Math.floor(Math.random() * 50) + 1) * 20,
    (Math.floor(Math.random() * 50) + 1) * 20,
  ]
}

function isCreationValid(creations: number[], amount: any, creationDate: any) {
  return true
}
