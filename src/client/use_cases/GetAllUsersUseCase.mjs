class GetAllUsers {
  constructor(repository) {
    this.repository = repository
  }

  async execute() {
    return await this.repository.getAllUsers()
  }
}
export default GetAllUsers
