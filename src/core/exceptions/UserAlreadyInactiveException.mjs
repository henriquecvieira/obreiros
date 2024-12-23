import BaseException from "./BaseException.mjs"
import StatusCode from "../http/StatusCode.mjs"

class UserAlreadyInactiveException extends BaseException {
  constructor(message = "Usuário já está inativo") {
    super(StatusCode.FORBIDDEN(), message, true)
  }
}

export default UserAlreadyInactiveException
