import bcrypt from "bcryptjs"

class LogicalDelete {
  constructor(repository) {
    this.repository = repository
  }

  async execute(data) {
    const existentUser = await this.repository.getUserByIdOrEmail(data)
    if (!existentUser) {
      throw new Error("Usuário não encontrado")
    }
    if (existentUser.active === false) {
      throw new Error("Usuário não existe")
    }
    const userId = existentUser._id.toString()
    await this.repository.logicalDelete(userId)
    return {
      user: existentUser,
    }
  }
}

export default LogicalDelete
