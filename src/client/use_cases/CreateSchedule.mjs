import UUIDGenerator from "../../support/UUIDGenerator.mjs";

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
  async execute(params) {
    const schedule = params.schedule
    for (let i = 0; i < schedule.length; i++) {
     const newSchedule = {
      _id: UUIDGenerator.generate(),
        name: schedule[i].name.trim(),
        department: schedule[i].department,
        time: schedule[i].time,
        date: new Date(`${schedule[i].date}T${schedule[i].time}:00.000Z`),
        createdAt: new Date(),
     }
   await this.scheduleRepository.save(newSchedule);

    }
    return true

  }

}

export default CreateSchedule;
