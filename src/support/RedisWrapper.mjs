import Redis from 'ioredis';

class RedisWrapper {
  constructor() {
    this.client = new Redis();
  }

  // Método para salvar um agendamento temporário
  async saveTemporarySchedule(schedule) {
    const scheduleKey = `temporary_schedule:${schedule._id}`;
    await this.client.set(scheduleKey, JSON.stringify(schedule), 'EX', 3600); // Expira após 1 hora
  }

  // Método para buscar um agendamento temporário por ID
  async getTemporaryScheduleById(scheduleId) {
    const scheduleKey = `temporary_schedule:${scheduleId}`;
    const scheduleData = await this.client.get(scheduleKey);
    return scheduleData ? JSON.parse(scheduleData) : null;
  }

  // Método para deletar um agendamento temporário
  async deleteTemporarySchedule(scheduleId) {
    const scheduleKey = `temporary_schedule:${scheduleId}`;
    await this.client.del(scheduleKey);
  }

  // Novo método para buscar todos os agendamentos confirmados
  async getAllConfirmedSchedules() {
    const schedulesData = await this.client.get('confirmed_schedules');
    return schedulesData ? JSON.parse(schedulesData) : {}; // Retorna um objeto vazio caso não haja agendamentos confirmados
  }

  // Novo método para salvar todos os agendamentos confirmados
  async saveConfirmedSchedules(schedules) {
    await this.client.set('confirmed_schedules', JSON.stringify(schedules));
  }
}

export default new RedisWrapper();
