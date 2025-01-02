class schedule {
  constructor(repositoryImpl) {
    this.collection = "schedule"
    this.repository = repositoryImpl
  }
  async save(params) {
    return this.repository.save(this.collection, params)
  }
  async saveWorker(params) {
    return this.repository.saveWorker(this.collection, params)
  }
  async getById(id) {
    const data = await this.repository.get(this.collection, id)
    if (data?.length === 0) {
      return null
    }
    return data
  }
  async getAll() {
    const data = await this.repository.getAll(this.collection)
    if (data?.length === 0) {
      return null
    }
    return data
  }

  async getScheduleByDateAndTime(date, time) {
    return this.repository.getScheduleByDateAndTime(this.collection, date, time);
  }
  async getTemporaryScheduleById(scheduleId) {
    return this.repository.getTemporaryScheduleById(this.collection, scheduleId);
  }
  async deleteTemporarySchedule(scheduleId) {
    return this.repository.remove(this.collection, scheduleId);
  }
}

export default schedule
