import bcrypt from "bcryptjs"

class RecoverPassword {
  constructor(repository) {
    this.repository = repository
  }

  async execute(userId, resetToken, newPassword) {
    const existentUser = await this.repository.getUserById(userId)
    if (!existentUser) {
      throw new Error("Usuário não encontrado")
    }
    const existentResetToken = existentUser.resetToken.toString()
    const expiresAt = new Date(existentUser.resetTokenExpiresAt)
    if (existentResetToken !== resetToken || new Date() > expiresAt) {
      throw new Error("Token inválido ou expirado")
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await this.repository.saveNewPassword({
      _id: userId,
      newPassword: hashedPassword,
    })

    return { message: "Senha redefinida com sucesso!" }
  }
}

export default RecoverPassword
