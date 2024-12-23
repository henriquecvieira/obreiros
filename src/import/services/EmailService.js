import nodemailer from "nodemailer"

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "applicationdeveloper1000@gmail.com",
        pass: "tyfroeiufgmmyikd",
      },
    })
  }

  async sendPasswordResetCode(email, code) {
    const mailOptions = {
      from: '"API-CadastroArt" <applicationdeveloper1000@gmail.com>',
      to: email,
      subject: "Recuperação de Senha",
      text: `Seu código de verificação para redefinição de senha é:\n${code}\ne é válido por 10 minutos`,
      html: `<p>Seu código de verificação para redefinição de senha é:</p><p><strong>${code}</strong></p><p>e é válido por 10 minutos</p>`,
    }
    try {
      await this.transporter.sendMail(mailOptions)
      console.log("Código de redefinição gerado:", code)
      console.log("Email de redefinição de senha enviado com sucesso!")
    } catch (error) {
      console.error("Erro ao enviar email:", error)
      throw new Error("Falha ao enviar email de recuperação de senha")
    }
  }
}

export default EmailService
