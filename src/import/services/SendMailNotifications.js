import SendEmail from '../../../src/notification/services/SendEmail.mjs'
import { Notifier } from '../../core/notification/index.mjs'
import emailMessage from '../../../src/notification/views/email_message.js'

exports.sendmail = async (listEmail) => {
  // eslint-disable-next-line array-callback-return
  listEmail.map(email => {
    const envelope = {
      subject: 'E-mail to Bovcontrol',
      message: emailMessage(email.name)
    }

    const sendEmail = new SendEmail(Notifier)
    sendEmail.send(email, envelope)

    console.log(`O email programado para o usuário ${email.name} foi enviado com sucesso!`)
  })
}
