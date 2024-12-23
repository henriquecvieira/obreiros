import UnprocessableEntity from "../../core/exceptions/UnprocessableEntity.mjs"

class GetUserById {
  constructor(repository) {
    this.repository = repository
  }

  async execute(userId) {
    if (!userId) {
      throw new UnprocessableEntity("User ID is required.")
    }
    const user = await this.repository.getUserById(userId)
    if (!user) {
      throw new UnprocessableEntity("User not found.")
    }
    return user
  }
}

export default GetUserById
