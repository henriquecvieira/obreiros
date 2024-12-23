import userPresenter from "../presenters/userPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import eventoEmitter from "../../events/EventEmitter.mjs"
import { generatePassword } from "../../support/bccript.mjs"

class CreateUserAdmin {
  constructor(repository) {
    this.repository = repository
  }

  async execute(user) {
    const existentUser = await this.repository.getUserByName(user.name)
    if (existentUser) {
      throw new Error("User with the same name already exists")
    }
    const newUser = {
      _id: UUIDGenerator.generate(),
      createdAt: new Date(),
      name: user.name,
      contact: { email: user.email },
      role: user.role || 'user',
    };

    eventoEmitter.emit("User Created", newUser)
    return newUser
  }
}

export default CreateUserAdmin
