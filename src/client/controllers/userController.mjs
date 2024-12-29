import RepositoryImpl from "../../../infra/repository/index.mjs"
import UserRepository from "../repositories/userRespository.mjs"
import createUserValidator from "./validators/user.mjs"
import Create from "../use_cases/CreateUser.mjs"
import userPresenter from "../presenters/userPresenter.mjs"

const Repository = new UserRepository(RepositoryImpl)

export async function createUser(req, res, next) {
  try {
    const user = req.body
    await createUserValidator.validate(user)
    const CreateUserUseCase = new Create(Repository)
    const createdUser = await CreateUserUseCase.execute(user)
    await Repository.save(createdUser)
    const resultUser = userPresenter(createdUser)
    return res.status(200).json(resultUser)
  } catch (error) {
    return next(error)
  }
}


