import UUIDGenerator from "../../support/UUIDGenerator.mjs";
import RedisWrapper from "../../support/RedisWrapper.mjs";

class CreateSchedule {
  constructor(repository, scheduleRepository) {
    this.repository = repository;
    this.scheduleRepository = scheduleRepository;
  }

  async loadWorkers() {
    try {
      const workers = await this.repository.getAll()
      const workerData = workers.map(worker => ({
        id: worker._id,
        name: worker.name
      }));
      return workerData;
    } catch (error) {
      throw new Error("Erro ao carregar os obreiros.")
    }
  }
  async execute(schedule) {
    const existentSchedule = await this.repository.getScheduleByDateAndTime(schedule.date, schedule.time);
    if (existentSchedule) {
      throw new Error("Já existe um obreiro agendado para esta data e horário.");
    }

    const newSchedule = {
      _id: UUIDGenerator.generate(),
      workerId: schedule.workerId,
      department: schedule.department,
      date: schedule.date,
      time: schedule.time,
      createdAt: new Date(),
      confirmed: false,
    };

    await RedisWrapper.saveTemporarySchedule(newSchedule);
    return newSchedule;
  }
  async confirmSchedule(scheduleId) {
    const temporarySchedule = await RedisWrapper.getTemporaryScheduleById(scheduleId);
    if (!temporarySchedule) {
      throw new Error("Escala não encontrada.");
    }

    temporarySchedule.confirmed = true;

    const confirmedSchedule = await this.repository.save(temporarySchedule);

    await RedisWrapper.deleteTemporarySchedule(scheduleId);

    return confirmedSchedule;
  }
}

export default CreateSchedule;
