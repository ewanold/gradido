import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express'
import express, { Express } from 'express'

// database
import connection from '@/typeorm/connection'
import { checkDBVersion } from '@/typeorm/DBVersion'

// server
import cors from './cors'
import serverContext from './context'
import plugins from './plugins'

// config
import CONFIG from '@/config'

// graphql
import schema from '@/graphql/schema'

// webhooks
import { elopageWebhook } from '@/webhook/elopage'
import { Connection } from '@dbTools/typeorm'

// DHT
import { startDHT } from '@/federation/index'

import { apolloLogger } from './logger'
import { Logger } from 'log4js'

// TODO implement
// import queryComplexity, { simpleEstimator, fieldConfigEstimator } from "graphql-query-complexity";

type ServerDef = { apollo: ApolloServer; app: Express; con: Connection }

const createServer = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any = serverContext,
  logger: Logger = apolloLogger,
): Promise<ServerDef> => {
  logger.debug('createServer...')

  // open mysql connection
  const con = await connection()
  if (!con || !con.isConnected) {
    logger.fatal(`Couldn't open connection to database!`)
    throw new Error(`Fatal: Couldn't open connection to database`)
  }

  // check for correct database version
  const dbVersion = await checkDBVersion(CONFIG.DB_VERSION)
  if (!dbVersion) {
    logger.fatal('Fatal: Database Version incorrect')
    throw new Error('Fatal: Database Version incorrect')
  }

  // start DHT hyperswarm when DHT_TOPIC is set in .env
  if (CONFIG.DHT_TOPIC) {
    await startDHT(con, CONFIG.DHT_TOPIC)
  }

  // Express Server
  const app = express()

  // cors
  app.use(cors)

  // bodyparser json
  app.use(express.json())
  // bodyparser urlencoded for elopage
  app.use(express.urlencoded({ extended: true }))

  // Elopage Webhook
  app.post('/hook/elopage/' + CONFIG.WEBHOOK_ELOPAGE_SECRET, elopageWebhook)

  // Apollo Server
  const apollo = new ApolloServer({
    schema: await schema(),
    playground: CONFIG.GRAPHIQL,
    introspection: CONFIG.GRAPHIQL,
    context,
    plugins,
    logger,
  })
  apollo.applyMiddleware({ app, path: '/' })
  logger.debug('createServer...successful')
  return { apollo, app, con }
}

export default createServer
