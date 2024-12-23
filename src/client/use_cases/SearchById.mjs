/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import DataNotFoundException from "../../core/exceptions/DataNotFoundException.mjs"

class StoreUsers {
  constructor(repository) {
    this.repository = repository
  }

  async execute(id) {
    const idUser = UUIDGenerator.from(id)
    const user = await this.repository.getUserByCreatedId(idUser)
    if (!user) {
      throw new DataNotFoundException("users not found!")
    }
    return user
  }
}

export default StoreUsers
