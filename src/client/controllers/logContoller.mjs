
import RepositoryImpl from "../../../infra/repository/index.mjs"
import LogRepository from "../repositories/logs.mjs"
import LogUseCase from "../use_cases/getLogAction.mjs"
import LogByDate from "../use_cases/logByDateUseCase.mjs"
import LogByUserId from "../use_cases/logByUserIdUseCase.mjs"
import logValidator from "./validators/log.mjs"
import logByDateValidator from "./validators/logByDateValidator.mjs"
import loginLogPresenter from "../presenters/loginLogPresenter.mjs"
import logByIdPresenter from "../presenters/logByIdPresenter.mjs"


const Repository = new LogRepository(RepositoryImpl)

export async function getLogsByAction(req, res, next) {
  try {
    const action = req.body
    await logValidator.validate(action)
    const actionLog = new LogUseCase(Repository)
    const result = await actionLog.execute(action)
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}
export async function getLogsByDate(req, res, next) {
  try {
    const { startDate, endDate } = req.body;
    const data = { startDate, endDate }
    await logByDateValidator.validate(data)
    const dateLog = new LogByDate(Repository)
    const result = await dateLog.execute(data)
    const resultLog = loginLogPresenter(result)
    return res.status(200).json(resultLog)
  } catch (error) {
    return next(error)
  }
}
export async function getLogsByUserId(req, res, next) {
  try {
    const data = req.body
    await logValidator.validate(data)
    const userIdLog = new LogByUserId(Repository)
    const result = await userIdLog.execute(data)
    const resultLog = logByIdPresenter(result)
    return res.status(200).json(resultLog)
  } catch (error) {
    return next(error)
  }
}
