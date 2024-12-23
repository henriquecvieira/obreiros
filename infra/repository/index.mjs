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
  async updateService(collection, id) {
    const statement = this.queries.searchUserById
    return this.impl.updateOne(collection, statement.query(id))
  }
  async savePasswordResetToken(collection, id, token, resetTokenExpiresAt) {
    const statement = this.queries.savePasswordResetToken
    const { filter, update } = statement.query(id, token, resetTokenExpiresAt)
    return this.impl.updateOne(collection, filter, update)
  }
  async saveNewPassword(collection, { _id, newPassword }) {
    const statement = this.queries.saveNewPassword
    const { filter, update } = statement.query({ _id, newPassword })
    return this.impl.updateOne(collection, filter, update)
  }
  async searchUserByCreatedId(collection, id) {
    const statement = this.queries.searchUserByCreatedId
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
  async getUserByName(collection, name) {
    const statement = this.queries.getUserByName
    return this.impl.findOne(collection, statement.query(name))
  }

  async getUserByIdOrEmail(collection, data) {
    const statement = this.queries.queryGetByIdOrEmail
    return this.impl.findOne(collection, statement.query(data))
  }

  async logicalDelete(collection, data) {
    const statement = this.queries.queryLogicalDelete
    const { filter, update } = statement.query(data)
    return this.impl.updateOne(collection, filter, update)
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
