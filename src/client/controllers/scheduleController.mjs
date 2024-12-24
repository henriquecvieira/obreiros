import Schedule from "../use_cases/scheduleUseCase.mjs"

export async function schedule(req, res) {
  try {
    const schedule = new Schedule()
    console.log({req: req.body})
    const createSchedule = await schedule.execute(req, res)
    console.log({createSchedule})
    return res.status(200).json(result)
  } catch (error) {
    console.log({error})
  }
}



