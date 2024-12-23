/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs'

class RemoveById {
  constructor(repository) {
    this.repository = repository
  }

  async execute(id) {
    const idUser = UUIDGenerator.from(id)
    const user = await this.repository.remove(idUser)
    if (user.deletedCount === 1) {
      return true
    }
    throw new DataNotFoundException('users not found!')
  }
}

export default RemoveById
