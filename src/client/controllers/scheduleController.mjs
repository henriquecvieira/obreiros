import RepositoryImpl from "../../../infra/repository/index.mjs"
import LogRepository from "../repositories/logs.mjs"
import scheduleRepository from "../repositories/scheduleRepository.mjs"
import createRoleValidator from "./validators/roles.mjs"
import Role from "../use_cases/CreateRoles.mjs"
import rolePresenter from "../presenters/createRolePresenter.mjs"

const LRepository = new LogRepository(RepositoryImpl)
const SchRepository = new scheduleRepository(RepositoryImpl)


export async function schedule(req, res, next) {
  try {
    const role = req.body
    await createRoleValidator.validate(role)
    const CreateRoleUseCase = new Role(SchRepository)
    const createdRole = await CreateRoleUseCase.execute(role)
    await RLRepository.save(createdRole)
    const result = rolePresenter(createdRole)
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}



