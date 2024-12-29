import Schedule from "../use_cases/scheduleUseCase.mjs"

export async function schedule(req, res, next) {
  try {
    const schedule = new Schedule()
    const createSchedule = await schedule.execute(req, res)
    return res.status(200).json(createSchedule)
  } catch (error) {
    return next(error)
  }
}



