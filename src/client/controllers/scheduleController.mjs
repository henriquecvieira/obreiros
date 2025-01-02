import RepositoryImpl from "../../../infra/repository/index.mjs"
import Repository from "../repositories/userRepository.mjs"
import ScheduleRepository from "../repositories/scheduleRepository.mjs"
import CreateSchedule from "../use_cases/CreateSchedule.mjs"
import RedisWrapper from "../../support/RedisWrapper.mjs"

const repository = new Repository(RepositoryImpl)
const scheduleRepository = new ScheduleRepository(RepositoryImpl)


export async function listWorkers(req, res, next) {
  try {
    const getWorker = new CreateSchedule(repository);
    const workers = await getWorker.loadWorkers();
     return res.status(200).json(workers);
  } catch (error) {
    return next(error);
  }
}
export async function schedule(req, res, next) {
  try {
    const data = req.body
    const schedule = new CreateSchedule(repository, scheduleRepository)
    const createSchedule = await schedule.execute(data)
    return res.status(200).json(createSchedule)
  } catch (error) {
    return next(error)
  }
}

export async function taskAssignment(req, res, next) {
  try {
    await RedisWrapper.saveTemporarySchedule(data);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

export async function confirmTaskAssignment(req, res, next) {
  try {
    const { scheduleId } = req.params;
    const temporarySchedule = await RedisWrapper.getTemporaryScheduleById(scheduleId);
    if (!temporarySchedule) {
      return res.status(404).json({ message: "Temporary schedule not found" });
    }
    const createScheduleUseCase = new CreateSchedule(scheduleRepository);
    const confirmedSchedule = await createScheduleUseCase.confirmSchedule(scheduleId);
    return res.status(200).json(confirmedSchedule);
  } catch (error) {
    return next(error);
  }
}


