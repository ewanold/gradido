// ATTENTION: DO NOT PUT ANY SECRETS IN HERE (or the .env)

import dotenv from 'dotenv'
dotenv.config()

const server = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret123',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '10m',
  GRAPHIQL: process.env.GRAPHIQL === 'true' || false,
  LOGIN_API_URL: process.env.LOGIN_API_URL || 'http://localhost/', // login_api/',
  COMMUNITY_API_URL: process.env.COMMUNITY_API_URL || 'http://ngninx/api/',
}

// This is needed by graphql-directive-auth
process.env.APP_SECRET = server.JWT_SECRET

const CONFIG = { ...server }

export default CONFIG
