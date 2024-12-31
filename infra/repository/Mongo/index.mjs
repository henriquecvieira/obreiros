// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config'
// import { MongoMemoryServer } from 'mongodb-memory-server'
import Mongo from './Mongo.mjs'
import Application from '../../../src/support/Application.mjs'

let {
  DB_HOST_LOCAL,
  DB_USER_LOCAL,
  DB_PASSWORD_LOCAL,
  DB_NAME,
  DB_PORT_LOCAL,
  DB_URI
} = process.env

if (Application.isInLocalMode()) {
  DB_URI = `mongodb://${DB_USER_LOCAL}:${DB_PASSWORD_LOCAL}@${DB_HOST_LOCAL}:${DB_PORT_LOCAL}?authSource=admin`
}

const databaseClient = new Mongo(DB_URI, DB_NAME)
databaseClient.connect()

export { databaseClient as Implementation }
export default databaseClient
