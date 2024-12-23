import userPresenter from "../presenters/userPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import eventoEmitter from "../../events/EventEmitter.mjs"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import UnprocessableEntity from "../../core/exceptions/UnprocessableEntity.mjs"


class GetAppUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userId) {
    const user = await this.repository.getUserById(userId);

    return {
      _id: user._id,
      name: user.name,
      email: user.contact.email,
    };
  }
}

export default GetAppUseCase;
