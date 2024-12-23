import userPresenter from "../presenters/userPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"

class Form {
  constructor(repository) {
    this.repository = repository
  }

  async execute(id, user) {
    const existingUser = await this.repository.getUserById(
      id
    )

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
      ...user,
      contact: {
        ...user.contact,
        email: existingUser.contact.email,
      },
    }

    return updateForm
  }
}

export default Form
