import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import { generatePassword } from "../../support/bccript.mjs"

class CreateUser {
  constructor(repository) {
    this.repository = repository
    // this.logUseCase = logUseCase
  }

  async execute(user) {
    const existentUser = await this.repository.getUserByName(user.name)
    if (existentUser) {
      throw new Error("User with the same name already exists")
    }
    const newUser = {
      _id: UUIDGenerator.generate(),
      name: user.name,
      function: user.function,
      gender: user.gender,
      active: true,
      createdAt: new Date(),
    };

    // await this.logUseCase.logAction({
    //   userId: newUser._id,
    //   action: "User Created",
    //   ipAddress: user.ipAddress,
    //   additionalData: { email: user.email },
    // });


    return newUser
  }
}

export default CreateUser
