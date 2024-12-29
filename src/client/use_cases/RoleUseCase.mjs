import UUIDGenerator from "../../support/UUIDGenerator.mjs"

class Role {
  constructor(repository, /*logUseCase*/) {
    this.repository = repository
    // this.logUseCase = logUseCase
  }

  async execute(params) {
    const existentRole = await this.repository.getRole(params.role)
    if (existentRole) {
      throw new Error("The same role already exists")
    }
    const newRole = {
      _id: UUIDGenerator.generate(),
      role: params.role,
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
