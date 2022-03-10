import { INALIENABLE_RIGHTS } from './INALIENABLE_RIGHTS'
import { RIGHTS } from './RIGHTS'
import { Role } from './Role'

export const ROLE_UNAUTHORIZED = new Role('unauthorized', INALIENABLE_RIGHTS)
export const ROLE_USER = new Role('user', [
  ...INALIENABLE_RIGHTS,
  RIGHTS.VERIFY_LOGIN,
  RIGHTS.BALANCE,
  RIGHTS.LIST_GDT_ENTRIES,
  RIGHTS.EXIST_PID,
  RIGHTS.GET_KLICKTIPP_USER,
  RIGHTS.GET_KLICKTIPP_TAG_MAP,
  RIGHTS.UNSUBSCRIBE_NEWSLETTER,
  RIGHTS.SUBSCRIBE_NEWSLETTER,
  RIGHTS.TRANSACTION_LIST,
  RIGHTS.SEND_COINS,
  RIGHTS.LOGOUT,
  RIGHTS.UPDATE_USER_INFOS,
  RIGHTS.HAS_ELOPAGE,
  RIGHTS.CREATE_TRANSACTION_LINK,
])
export const ROLE_ADMIN = new Role('admin', Object.values(RIGHTS)) // all rights

// TODO from database
export const ROLES = [ROLE_UNAUTHORIZED, ROLE_USER, ROLE_ADMIN]
