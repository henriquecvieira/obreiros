import EmailMessage from './email/EmailMessage.mjs'
import EmailSender from './email/EmailSender.mjs'
import SMSSender from './sms/SMSSender.mjs'

// const MAIL_FROM = process.env.MAIL_FROM ? process.env.MAIL_FROM : 'hello@bovcontrol.com'

class Notifier {
  static email(email) {
    return EmailSender.send(
      new EmailMessage(
        // MAIL_FROM,
        email.from,
        [email.to],
        email.subject,
        email.message
      )
    )
  }

  static sms(sms) {
    return SMSSender.send(sms)
  }
}

export default Notifier
