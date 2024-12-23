class Log {
  constructor(repositoryImpl) {
    this.collection = "logs"
    this.repository = repositoryImpl
  }
  async save(params) {
    return this.repository.save(this.collection, params)
  }
  async saveLog(params) {
    return this.repository.saveLog(this.collection, params)
  }
  async getById(id) {
    const data = await this.repository.get(this.collection, id)
    if (data?.length === 0) {
      return null
    }
    return data
  }

  async findLogs(filters, pagination) {
    return this.repository.findLogs(this.collection, filters, pagination);
  }
  async logsByAction(filters, pagination) {
    return this.repository.logsByAction(this.collection, filters, pagination);
  }
  async logsByDate(data) {
    return this.repository.logsByDate(this.collection, data);
  }
  async logsByUserId(data) {
    return this.repository.logsByUserId(this.collection, data);
  }

}

export default Log
