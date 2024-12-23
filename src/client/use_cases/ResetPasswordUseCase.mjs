import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import EmailService from "../../import/services/EmailService.js"

class RecoverPassword {
  constructor(repository) {
    this.repository = repository
    this.emailService = new EmailService()
  }

  async execute(user) {
    const existentUser = await this.repository.searchUserByEmail(user.email)
    if (!existentUser) {
      throw new Error("Usuário não encontrado com esse email")
    }
    const resetToken = UUIDGenerator.generate()
    const resetTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000)
    await this.repository.savePasswordResetToken(
      existentUser._id,
      resetToken,
      resetTokenExpiresAt
    )
    await this.emailService.sendPasswordResetCode(
      existentUser.contact.email,
      resetToken
    )

    return
  }
}

export default RecoverPassword
