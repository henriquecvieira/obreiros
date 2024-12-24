// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config'
import Mongo from './Mongo.mjs'
import Application from '../../../src/support/Application.mjs'

let {
  DB_NAME,
  DB_URL
} = process.env

if (Application.isInLocalMode()) {
  DB_URL
}

const databaseClient = new Mongo(DB_URL, DB_NAME)
databaseClient.connect()

export { databaseClient as Implementation }
export default databaseClient
