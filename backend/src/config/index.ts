// ATTENTION: DO NOT PUT ANY SECRETS IN HERE (or the .env)

import dotenv from 'dotenv'
import Decimal from 'decimal.js-light'
dotenv.config()

Decimal.set({
  precision: 25,
  rounding: Decimal.ROUND_HALF_UP,
})

const constants = {
  DB_VERSION: '0034-drop_server_user_table',
  DECAY_START_TIME: new Date('2021-05-13 17:46:31'), // GMT+0
  CONFIG_VERSION: {
    DEFAULT: 'DEFAULT',
    EXPECTED: 'v6.2022-04-21',
    CURRENT: '',
  },
}

const server = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret123',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30m',
  GRAPHIQL: process.env.GRAPHIQL === 'true' || false,
  GDT_API_URL: process.env.GDT_API_URL || 'https://gdt.gradido.net',
  PRODUCTION: process.env.NODE_ENV === 'production' || false,
}

const database = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_DATABASE: process.env.DB_DATABASE || 'gradido_community',
  TYPEORM_LOGGING_RELATIVE_PATH: process.env.TYPEORM_LOGGING_RELATIVE_PATH || 'typeorm.backend.log',
}

const klicktipp = {
  KLICKTIPP: process.env.KLICKTIPP === 'true' || false,
  KLICKTTIPP_API_URL: process.env.KLICKTIPP_API_URL || 'https://api.klicktipp.com',
  KLICKTIPP_USER: process.env.KLICKTIPP_USER || 'gradido_test',
  KLICKTIPP_PASSWORD: process.env.KLICKTIPP_PASSWORD || 'secret321',
  KLICKTIPP_APIKEY_DE: process.env.KLICKTIPP_APIKEY_DE || 'SomeFakeKeyDE',
  KLICKTIPP_APIKEY_EN: process.env.KLICKTIPP_APIKEY_EN || 'SomeFakeKeyEN',
}

const community = {
  COMMUNITY_NAME: process.env.COMMUNITY_NAME || 'Gradido Entwicklung',
  COMMUNITY_URL: process.env.COMMUNITY_URL || 'http://localhost/',
  COMMUNITY_REGISTER_URL: process.env.COMMUNITY_REGISTER_URL || 'http://localhost/register',
  COMMUNITY_REDEEM_URL: process.env.COMMUNITY_REDEEM_URL || 'http://localhost/redeem/{code}',
  COMMUNITY_DESCRIPTION:
    process.env.COMMUNITY_DESCRIPTION || 'Die lokale Entwicklungsumgebung von Gradido.',
}

const loginServer = {
  LOGIN_APP_SECRET: process.env.LOGIN_APP_SECRET || '21ffbbc616fe',
  LOGIN_SERVER_KEY: process.env.LOGIN_SERVER_KEY || 'a51ef8ac7ef1abf162fb7a65261acd7a',
}

const email = {
  EMAIL: process.env.EMAIL === 'true' || false,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME || 'gradido_email',
  EMAIL_SENDER: process.env.EMAIL_SENDER || 'info@gradido.net',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'xxx',
  EMAIL_SMTP_URL: process.env.EMAIL_SMTP_URL || 'gmail.com',
  EMAIL_SMTP_PORT: process.env.EMAIL_SMTP_PORT || '587',
  EMAIL_LINK_VERIFICATION:
    process.env.EMAIL_LINK_VERIFICATION || 'http://localhost/checkEmail/{optin}{code}',
  EMAIL_LINK_SETPASSWORD:
    process.env.EMAIL_LINK_SETPASSWORD || 'http://localhost/reset-password/{optin}',
  EMAIL_LINK_FORGOTPASSWORD:
    process.env.EMAIL_LINK_FORGOTPASSWORD || 'http://localhost/forgot-password',
  EMAIL_LINK_OVERVIEW: process.env.EMAIL_LINK_OVERVIEW || 'http://localhost/overview',
  // time in minutes a optin code is valid
  EMAIL_CODE_VALID_TIME: process.env.EMAIL_CODE_VALID_TIME
    ? parseInt(process.env.EMAIL_CODE_VALID_TIME) || 1440
    : 1440,
  // time in minutes that must pass to request a new optin code
  EMAIL_CODE_REQUEST_TIME: process.env.EMAIL_CODE_REQUEST_TIME
    ? parseInt(process.env.EMAIL_CODE_REQUEST_TIME) || 10
    : 10,
}

const webhook = {
  // Elopage
  WEBHOOK_ELOPAGE_SECRET: process.env.WEBHOOK_ELOPAGE_SECRET || 'secret',
}

// This is needed by graphql-directive-auth
process.env.APP_SECRET = server.JWT_SECRET

// Check config version
constants.CONFIG_VERSION.CURRENT = process.env.CONFIG_VERSION || constants.CONFIG_VERSION.DEFAULT
if (
  ![constants.CONFIG_VERSION.EXPECTED, constants.CONFIG_VERSION.DEFAULT].includes(
    constants.CONFIG_VERSION.CURRENT,
  )
) {
  throw new Error(
    `Fatal: Config Version incorrect - expected "${constants.CONFIG_VERSION.EXPECTED}" or "${constants.CONFIG_VERSION.DEFAULT}", but found "${constants.CONFIG_VERSION.CURRENT}"`,
  )
}

const CONFIG = {
  ...constants,
  ...server,
  ...database,
  ...klicktipp,
  ...community,
  ...email,
  ...loginServer,
  ...webhook,
}

export default CONFIG
