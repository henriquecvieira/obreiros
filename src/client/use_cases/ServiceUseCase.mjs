import userPresenter from "../presenters/userPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import { UUID } from "mongodb"
import eventoEmitter from "../../events/EventEmitter.mjs"

class Service {
  constructor(repository) {
    this.repository = repository
  }

  async execute(id, newService) {
    const user_id = new UUID(id)
    const existingUser = await this.repository.getUserById(user_id)
    if (!existingUser) {
      throw new Error("Usuário não encontrado.")
    }
    const userId = existingUser._id
    if (!userId) {
      throw new Error("O usuário existente não contém um _id.")
    }
    const updateForm = {
      ...existingUser,
      updatedAt: new Date(),
      services: [...(existingUser.services || []), newService],
    }
    return updateForm
  }
}

export default Service
