/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */

import EventEmitter from "events"
import RepositoryImpl from "../../../infra/repository/index.mjs"
import UserRepository from "../repositories/userRespository.mjs"
import LogRepository from "../repositories/logs.mjs"
import Create from "../use_cases/CreateUser.mjs"
import CreateUserAdmin from "../use_cases/CreateAdminUser.mjs"
import Login from "../use_cases/LoginUserUseCase.mjs"
import Form from "../use_cases/FormUseCase.mjs"
import Service from "../use_cases/ServiceUseCase.mjs"
import GetUser from "../use_cases/GetUserById.mjs"
import GetAllUsers from "../use_cases/GetAllUsersUseCase.mjs"
import GetApp from "../use_cases/GetAppUseCase.mjs"
import Reset from "../use_cases/ResetPasswordUseCase.mjs"
import Recover from "../use_cases/RecoverPasswordUseCase.mjs"
import LogicalDelete from "../use_cases/logicalDeleteUseCase.mjs"
import LogUser from "../use_cases/LogUseCase.mjs";
import loginValidator from "./validators/loginValidator.mjs"
import userFormValidator from "./validators/userForm.mjs"
import createUserValidator from "./validators/user.mjs"
import createServiceValidator from "./validators/serviceValidator.js"
import userIdValidator from "./validators/userIdValidator.mjs"
import recoverPasswordValidator from "./validators/recoverPasswordValidator.mjs"
import resetPasswordValidator from "./validators/resetPasswordValidator.mjs"
import logicalDeleteValidator from "./validators/logicalDeleteValidator.mjs"
import userPresenter from "../presenters/userPresenter.mjs"
import formPresenter from "../presenters/formPresenter.mjs"
import servicePresenter from "../presenters/servicePresenter.mjs"
import userByIdPresenter from "../presenters/userByIdPresenter.mjs"
import logicalDeletePresenter from "../presenters/logicalDeletePresenter.mjs"
import allUsersPresenter from "../presenters/allUsersPesenter.mjs"

const Repository = new UserRepository(RepositoryImpl)
const LRepository = new LogRepository(RepositoryImpl)
const logUseCase = new LogUser(LRepository);

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
export async function roles(req, res, next) {
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

e