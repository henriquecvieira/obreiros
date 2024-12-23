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

export async function createAdminUser(req, res, next) {
  try {
    const user = req.body
    await createUserValidator.validate(user)
    const CreateUserUseCase = new CreateUserAdmin(Repository)
    const createdUser = await CreateUserUseCase.execute(user, L)
    const resultUser = userPresenter(createdUser)
    return res.status(200).json(resultUser)
  } catch (error) {
    return next(error)
  }
}
export async function loginUser(req, res, next) {
  try {
    const user = req.body
    await loginValidator.validate(user)
    const loginUserUseCase = new Login(Repository, logUseCase)
    const loggedIndUser = await loginUserUseCase.execute(user)
    return res.status(200).json(loggedIndUser)
  } catch (error) {
    return next(error)
  }
}
export async function updateUserForm(req, res, next) {
  try {
    const user = req.body
    await userFormValidator.validate(user)
    const formUseCase = new Form(Repository)
    const updatedUser = await formUseCase.execute(req._id, user)
    await Repository.save(updatedUser)
    const resultUser = formPresenter(updatedUser)
    console.log(resultUser)
    return res.status(200).json(resultUser)
  } catch (error) {
    return next(error)
  }
}
export async function addUserService(req, res, next) {
  try {
    const userId = req.params.id
    const newService = req.body.service
    await createServiceValidator.validate(newService)
    const serviceUseCase = new Service(Repository)
    const updatedUser = await serviceUseCase.execute(userId, newService)
    await Repository.save(updatedUser)
    const resultUser = servicePresenter(updatedUser)
    return res.status(200).json(resultUser)
  } catch (error) {
    return next(error)
  }
}
export async function getUser(req, res, next) {
  try {
    const userId = req.params._id
    await userIdValidator.validate(userId)
    const getUserByIdUseCase = new GetUser(Repository)
    const user = await getUserByIdUseCase.execute(userId)
    const resultUser = userByIdPresenter(user)
    return res.status(200).json(resultUser)
  } catch (error) {
    return next(error)
  }
}
export async function getManyUsers(req, res, next) {
  try {
    const getAllUsersUseCase = new GetAllUsers(Repository)
    const users = await getAllUsersUseCase.execute()
    const resultUsers = users.map(allUsersPresenter)
    return res.status(200).json(resultUsers)
  } catch (error) {
    return next(error)
  }
}



export async function resetPassword(req, res, next) {
  try {
    const data = req.body
    await resetPasswordValidator.validate(data)
    const resetPasswordUseCase = new Reset(Repository)
    await resetPasswordUseCase.execute(data)
    return res.status(200).json({
      message: "Um link de recuperação de senha foi enviado para o seu email.",
    })
  } catch (error) {
    return next(error)
  }
}
export async function recoverPassword(req, res, next) {
  try {
    const { userId, resetToken, newPassword } = req.body
    await recoverPasswordValidator.validate({
      userId,
      resetToken,
      newPassword,
    })
    const recoverPasswordUseCase = new Recover(Repository)
    await recoverPasswordUseCase.execute(userId, resetToken, newPassword)
    return res.status(200).json({ message: "senha redefinada com sucesso!" })
  } catch (error) {
    return next(error)
  }
}
export async function logicalDeleteUser(req, res, next) {
  try {
    const data = req.body
    await logicalDeleteValidator.validate(data)
    const LogicalDeleteUseCase = new LogicalDelete(Repository)
    const result = await LogicalDeleteUseCase.execute(data)
    const presenter = logicalDeletePresenter(result.user)
    return res.status(200).json(presenter)
  } catch (error) {
    return next(error)
  }
}


export async function getApp(req, res, next) {
  try {
    const userId = req.userId
    const getAppUseCase = new GetApp(Repository)
    const user = await getAppUseCase.execute(userId)
    return res.status(200).json(user)
  } catch (error) {
    return next(error)
  }
}
