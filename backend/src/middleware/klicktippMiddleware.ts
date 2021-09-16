import { MiddlewareFn } from 'type-graphql'
import { signin, getKlickTippUser } from '../apis/KlicktippController'
import { KlickTipp } from '../graphql/models/KlickTipp'

export const klicktippRegistrationMiddleware: MiddlewareFn = async (
  // Only for demo
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  { root, args, context, info },
  next,
) => {
  // Do Something here before resolver is called
  const result = await next()
  // Do Something here after resolver is completed
  signin(result.email, result.language, result.firstName, result.lastName)
  return result
}

export const klicktippNewsletterStateMiddleware: MiddlewareFn = async (
  { root, args, context, info },
  next,
) => {
  const result = await next()
  const klickTippUser = await getKlickTippUser(result.email)
  const klickTipp = new KlickTipp(klickTippUser)
  result.klickTipp = klickTipp
  return result
}
