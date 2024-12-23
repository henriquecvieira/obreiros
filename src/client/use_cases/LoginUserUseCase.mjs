import userPresenter from "../presenters/userPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import eventoEmitter from "../../events/EventEmitter.mjs"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import UnprocessableEntity from "../../core/exceptions/UnprocessableEntity.mjs"

class LoginUser {
  constructor(repository, logUseCase) {
    this.repository = repository
    this.logUseCase = logUseCase
  }
  async execute(user) {
    const email = user.email
    if (!isValidEmail(email)) {
      throw new UnprocessableEntity("E-mail inválido.")
    }

    const existentUser = await this.repository.searchUserByEmail(email)
    let logAction = {
      userId: null,
      action: "User Login",
      ipAddress: user.ipAddress,
      additionalData: {
        success: false,
        message: "Usuário não encontrado",
        email: user.email,
      },
    }

    if (!existentUser) {
      await this.logUseCase.logAction(logAction)
      throw new Error("oops, something is wrong!!")
    }
    const match = await bcrypt.compare(user.password, existentUser.password)
    if (!match) {
      logAction.userId = existentUser._id
      logAction.additionalData.message = "Senha Inválida"
      await this.logUseCase.logAction(logAction)
      throw new UnprocessableEntity("Senha inválida.")
    }
    logAction.userId = existentUser._id
    logAction.additionalData.success = true
    logAction.additionalData.message = "Usuário logado"
    await this.logUseCase.logAction(logAction)

    const userForToken = {
      _id: existentUser._id,
      name: existentUser.name,
      userType: existentUser.userType,
      email: existentUser.contact.email
    }
    const token = jwt.sign(userForToken, process.env.KEY_TOKEN_JWT, {
      expiresIn: process.env.EXPIRES_IN,
    })

    console.log(token)
    return token
  }
}
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}
export default LoginUser
