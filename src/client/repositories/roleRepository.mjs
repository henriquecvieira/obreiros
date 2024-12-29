class Roles {
    constructor(repositoryImpl) {
      this.collection = "roles"
      this.repository = repositoryImpl
    }
    async save(params) {
      return this.repository.save(this.collection, params)
    }
    async saveOne(params) {
      return this.repository.updateService(this.collection, params)
    }
  
    async getById(id) {
      const data = await this.repository.get(this.collection, id)
      if (data?.length === 0) {
        return null
      }
      return data
    }
  
    async getAllUsers(id) {
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
  
    async getRole(params) {
      const data = await this.repository.getRole(this.collection, params)
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
  
  }
  
  export default Roles
  