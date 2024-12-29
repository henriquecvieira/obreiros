/* eslint max-len: ["error", { "code": 105}] */
import * as queries from "./Mongo/queries/index.mjs"
import { default as MongoImpl } from "./Mongo/index.mjs"


class RepositoryWrapper {
  constructor(impl, queryString) {
    this.queries = queryString
    this.impl = impl
  }

  save(collection, data) {
    return this.impl.save(collection, data)
  }
  saveLog(collection, data) {
    return this.impl.saveLog(collection, data)
  }

  remove(collection, id) {
    return this.impl.remove(collection, id)
  }

  get(collection, id) {
    return this.impl.get(collection, id)
  }

  getAll(collection) {
    return this.impl.getAll(collection)
  }
  async searchUserById(collection, id) {
    const statement = this.queries.searchUserById
    return this.impl.findOne(collection, statement.query(id))
  }
  async searchUsersByDate(collection, createdAt) {
    const statement = this.queries.searchUsersByDate
    return this.impl.find(collection, statement.query(createdAt))
  }
  async searchUserByEmail(collection, email) {
    const statement = this.queries.searchUserByEmail
    return this.impl.findOne(collection, statement.query(email))
  }
  async getRole(collection, params) {
    const statement = this.queries.getRole
    return this.impl.findOne(collection, statement.query(params))
  }

  async getUserByIdOrEmail(collection, data) {
    const statement = this.queries.queryGetByIdOrEmail
    return this.impl.findOne(collection, statement.query(data))
  }
  async getUserByName(collection, data) {
    const statement = this.queries.getUserByName
    return this.impl.findOne(collection, statement.query(data))
  }


  async findLogs(collection, data) {
    const statement = this.queries.logs
    return this.impl.find(collection, statement.query(data));
  }
  async logsByAction(collection, action) {
    const statement = this.queries.logsByAction
    return this.impl.find(collection, statement.query(action));
  }
  async logsByDate(collection, data) {
    const statement = this.queries.logsByDate
    return this.impl.find(collection, statement.query(data))
  }
  async logsByUserId(collection, data) {
    const statement = this.queries.logsByUserId
    return this.impl.find(collection, statement.query(data))
  }


}

export { Implementation } from "./Mongo/index.mjs"
export default new RepositoryWrapper(MongoImpl, queries)
