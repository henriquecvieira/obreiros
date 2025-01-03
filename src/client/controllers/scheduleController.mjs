import RepositoryImpl from "../../../infra/repository/index.mjs"
import Repository from "../repositories/userRepository.mjs"
import ScheduleRepository from "../repositories/scheduleRepository.mjs"
import CreateSchedule from "../use_cases/CreateSchedule.mjs"
import GetByDate from "../use_cases/GetByDate.mjs"
import path from 'path'

const repository = new Repository(RepositoryImpl)
const scheduleRepository = new ScheduleRepository(RepositoryImpl)


export async function listWorkers(_, res, next) {
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
export async function getScheduleByDate(req, res, next) {
  try {
    const { startDate, endDate } = req.query;
    console.log("Start Date:", startDate)
    console.log("End Date:", endDate)
    const getByDate = new GetByDate(scheduleRepository);
    const pdfPath = await getByDate.execute(startDate, endDate);
    const absolutePdfPath = path.resolve(pdfPath)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="escala.pdf"');
    res.sendFile(absolutePdfPath, (error) => {
      if (error) {
        console.error("Erro ao enviar o arquivo PDF", error);
        res.status(500).send("Erro ao gerar o PDF.");
      }
    });
  } catch (error) {
    return next(error);
  }
}




