import UUIDGenerator from "../../support/UUIDGenerator.mjs"

class Role {
  constructor(repository, logUseCase) {
    this.repository = repository
    this.logUseCase = logUseCase
  }

  async execute(params) {
    const existentUser = await this.repository.getUserByName(params.role)
    if (existentUser) {
      throw new Error("That roles already exists!")
    }
    const newRole = {
      _id: UUIDGenerator.generate(),
      role: user.function,
      createdAt: new Date(),
    };

    // await this.logUseCase.logAction({
    //   userId: newUser._id,
    //   action: "User Created",
    //   ipAddress: user.ipAddress,
    //   additionalData: { email: user.email },
    // });


    return newRole
  }
}

export default Role
