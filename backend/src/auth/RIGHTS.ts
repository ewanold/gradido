export enum RIGHTS {
  // Inalienable
  LOGIN = 'LOGIN',
  COMMUNITIES = 'COMMUNITIES',
  CREATE_USER = 'CREATE_USER',
  SEND_RESET_PASSWORD_EMAIL = 'SEND_RESET_PASSWORD_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  QUERY_TRANSACTION_LINK = 'QUERY_TRANSACTION_LINK',
  QUERY_OPT_IN = 'QUERY_OPT_IN',
  CHECK_USERNAME = 'CHECK_USERNAME',
  // User
  VERIFY_LOGIN = 'VERIFY_LOGIN',
  BALANCE = 'BALANCE',
  LIST_GDT_ENTRIES = 'LIST_GDT_ENTRIES',
  EXIST_PID = 'EXIST_PID',
  UNSUBSCRIBE_NEWSLETTER = 'UNSUBSCRIBE_NEWSLETTER',
  SUBSCRIBE_NEWSLETTER = 'SUBSCRIBE_NEWSLETTER',
  TRANSACTION_LIST = 'TRANSACTION_LIST',
  SEND_COINS = 'SEND_COINS',
  LOGOUT = 'LOGOUT',
  UPDATE_USER_INFOS = 'UPDATE_USER_INFOS',
  HAS_ELOPAGE = 'HAS_ELOPAGE',
  CREATE_TRANSACTION_LINK = 'CREATE_TRANSACTION_LINK',
  DELETE_TRANSACTION_LINK = 'DELETE_TRANSACTION_LINK',
  REDEEM_TRANSACTION_LINK = 'REDEEM_TRANSACTION_LINK',
  LIST_TRANSACTION_LINKS = 'LIST_TRANSACTION_LINKS',
  GDT_BALANCE = 'GDT_BALANCE',
  CREATE_CONTRIBUTION = 'CREATE_CONTRIBUTION',
  DELETE_CONTRIBUTION = 'DELETE_CONTRIBUTION',
  LIST_CONTRIBUTIONS = 'LIST_CONTRIBUTIONS',
  LIST_ALL_CONTRIBUTIONS = 'LIST_ALL_CONTRIBUTIONS',
  UPDATE_CONTRIBUTION = 'UPDATE_CONTRIBUTION',
  LIST_CONTRIBUTION_LINKS = 'LIST_CONTRIBUTION_LINKS',
  COMMUNITY_STATISTICS = 'COMMUNITY_STATISTICS',
  SEARCH_ADMIN_USERS = 'SEARCH_ADMIN_USERS',
  CREATE_CONTRIBUTION_MESSAGE = 'CREATE_CONTRIBUTION_MESSAGE',
  LIST_ALL_CONTRIBUTION_MESSAGES = 'LIST_ALL_CONTRIBUTION_MESSAGES',
  OPEN_CREATIONS = 'OPEN_CREATIONS',
  USER = 'USER',
  // Moderator
  SEARCH_USERS = 'SEARCH_USERS',
  ADMIN_CREATE_CONTRIBUTION = 'ADMIN_CREATE_CONTRIBUTION',
  ADMIN_UPDATE_CONTRIBUTION = 'ADMIN_UPDATE_CONTRIBUTION',
  ADMIN_DELETE_CONTRIBUTION = 'ADMIN_DELETE_CONTRIBUTION',
  ADMIN_LIST_CONTRIBUTIONS = 'ADMIN_LIST_CONTRIBUTIONS',
  CONFIRM_CONTRIBUTION = 'CONFIRM_CONTRIBUTION',
  SEND_ACTIVATION_EMAIL = 'SEND_ACTIVATION_EMAIL',
  LIST_TRANSACTION_LINKS_ADMIN = 'LIST_TRANSACTION_LINKS_ADMIN',
  CREATE_CONTRIBUTION_LINK = 'CREATE_CONTRIBUTION_LINK',
  DELETE_CONTRIBUTION_LINK = 'DELETE_CONTRIBUTION_LINK',
  UPDATE_CONTRIBUTION_LINK = 'UPDATE_CONTRIBUTION_LINK',
  ADMIN_CREATE_CONTRIBUTION_MESSAGE = 'ADMIN_CREATE_CONTRIBUTION_MESSAGE',
  MODERATOR_UPDATE_CONTRIBUTION_MEMO = 'MODERATOR_UPDATE_CONTRIBUTION_MEMO',
  DENY_CONTRIBUTION = 'DENY_CONTRIBUTION',
  ADMIN_OPEN_CREATIONS = 'ADMIN_OPEN_CREATIONS',
  ADMIN_LIST_ALL_CONTRIBUTION_MESSAGES = 'ADMIN_LIST_ALL_CONTRIBUTION_MESSAGES',
  // Admin
  SET_USER_ROLE = 'SET_USER_ROLE',
  DELETE_USER = 'DELETE_USER',
  UNDELETE_USER = 'UNDELETE_USER',
}
