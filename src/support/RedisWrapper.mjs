import Redis from 'ioredis';

class RedisWrapper {
  constructor() {
    this.client = new Redis()
  }

  async saveTemporarySchedule(schedule) {
    const scheduleKey = `temporary_schedule:${schedule._id}`;
    await this.client.set(scheduleKey, JSON.stringify(schedule), 'EX', 3600);
  }

  async getTemporaryScheduleById(scheduleId) {
    const scheduleKey = `temporary_schedule:${scheduleId}`;
    const scheduleData = await this.client.get(scheduleKey);
    return scheduleData ? JSON.parse(scheduleData) : null;
  }

  async deleteTemporarySchedule(scheduleId) {
    const scheduleKey = `temporary_schedule:${scheduleId}`;
    await this.client.del(scheduleKey);
  }
}

export default new RedisWrapper();
