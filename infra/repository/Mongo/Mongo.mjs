import { default as mongodb } from "mongodb"
const MongoClient = mongodb.MongoClient

class Mongo {
  constructor(connectionUri, database) {
    this._connection = null
    this._connectionUri = connectionUri
    this._database = database
  }

  async connect() {
    const mongoClient = await new MongoClient(this._connectionUri).connect()
    this._connection = mongoClient.db(this._database)
  }

  get connection() {
    return this._connection
  }

  aggregate(collection, statement, options) {
    return this.connection
      .collection(collection)
      .aggregate(statement, options)
      .toArray()
  }

  find(collection, statement, options) {
    return this.connection
      .collection(collection)
      .find(statement, options)
      .toArray()
  }

  findOne(collection, statement, options) {
    return this.connection.collection(collection).findOne(statement, options)
  }

  findCollation(collection, statement, options) {
    return this.connection
      .collection(collection)
      .find(statement, options)
      .collation({ locale: "en_US", strength: 1 })
      .toArray()
  }

  save(collection, data) {
    const { _id } = data
    return this.connection
      .collection(collection)
      .updateOne({ _id }, { $set: data }, { upsert: true })
  }

  saveWorker(collection, data) {
    const { _id } = data
    return this.connection
      .collection(collection)
      .insertOne({ _id }, { $set: data }, { upsert: true })
  }

  updateOne(collection, filter, update, options = {}) {
    return this.connection
      .collection(collection)
      .updateOne(filter, update, options)
  }

  get(collection, id) {
    return this.connection.collection(collection).findOne({ _id: id })
  }

  getAll(collection) {
    return this.connection.collection(collection).find({}).toArray()
  }

  remove(collection, id) {
    return this.connection.collection(collection).deleteOne({ _id: id })
  }


}

export default Mongo
