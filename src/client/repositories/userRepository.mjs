class User {
  constructor(repositoryImpl) {
    this.collection = "users"
    this.repository = repositoryImpl
  }
  async save(params) {
    return this.repository.save(this.collection, params)
  }
  async saveOne(params) {
    return this.repository.updateService(this.collection, params)
  }
  async savePasswordResetToken(id, token, resetTokenExpiresAt) {
    return this.repository.savePasswordResetToken(
      this.collection,
      id,
      token,
      resetTokenExpiresAt
    )
  }
  async saveNewPassword({ _id, newPassword }) {
    return this.repository.saveNewPassword(this.collection, {
      _id,
      newPassword,
    })
  }

  async getById(id) {
    const data = await this.repository.get(this.collection, id)
    if (data?.length === 0) {
      return null
    }
    return data
  }

  async getAll() {
    const data = await this.repository.getAll(this.collection)
    if (data?.length === 0) {
      return null
    }
    return data
  }

  async getUserById(id) {
    const data = await this.repository.searchUserById(this.collection, id)
    if (!data) {
      return null
    }
    return data
  }

  async getUserByCreatedId(id) {
    const data = await this.repository.get(this.collection, id)
    if (!data) {
      return null
    }
    return data
  }

  async remove(id) {
    return this.repository.remove(this.collection, id)
  }

  async searchUsersByDate(createdAt) {
    const data = await this.repository.searchUsersByDate(
      this.collection,
      createdAt
    )
    if (!data) {
      return null
    }
    return data
  }

  async searchUserByEmail(email) {
    const data = await this.repository.searchUserByEmail(this.collection, email)
    if (!data) {
      return null
    }
    return data
  }
  async getUserByName(name) {
    const data = await this.repository.getUserByName(this.collection, name)
    if (!data) {
      return null
    }
    return data
  }

  async getUserByIdOrEmail(data) {
    let query = {}
    if (data._id) {
      query = { _id: data._id }
    } else if (data.email) {
      query = { email: data.email }
    }
    const result = await this.repository.getUserByIdOrEmail(
      this.collection,
      query
    )
    if (!result) {
      return null
    }
    return result
  }

  async logicalDelete(data) {
    return this.repository.logicalDelete(this.collection, data)
  }
}

export default User
