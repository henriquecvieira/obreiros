import RepositoryImpl from "../../../infra/repository/index.mjs"
import UserRepository from "../repositories/userRespository.mjs"
import LogRepository from "../repositories/logs.mjs"
import RoleRepository from "../repositories/scheduleRepository.mjs"
import createUserValidator from "./validators/user.mjs"
import createRoleValidator from "./validators/roles.mjs"
import Create from "../use_cases/CreateUser.mjs"
import userPresenter from "../presenters/userPresenter.mjs"

const Repository = new UserRepository(RepositoryImpl)
const LRepository = new LogRepository(RepositoryImpl)
const RLRepository = new RoleRepository(RepositoryImpl)

export async function createUser(req, res, next) {
  try {
    const user = req.body
    await createUserValidator.validate(user)
    const CreateUserUseCase = new Create(Repository, logUseCase)
    const createdUser = await CreateUserUseCase.execute(user)
    await Repository.save(createdUser)
    const resultUser = userPresenter(createdUser)
    return res.status(200).json(resultUser)
  } catch (error) {
    return next(error)
  }
}


