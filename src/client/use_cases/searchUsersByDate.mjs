import DataNotFoundException from "../../core/exceptions/DataNotFoundException.mjs"
import userByIdPresenter from "../presenters/usersByIdPresenter.mjs"

export default class searchUsersByDate {
  constructor(repository) {
    this.repository = repository
  }

  async execute(createdAt) {
    try {
      const users = await this.repository.searchUsersByDate(createdAt)
      const resultUsers = users.map((user) => userByIdPresenter(user))
      return resultUsers
    } catch (error) {
      throw new DataNotFoundException("Erro ao buscar usuários por data")
    }
  }
}
