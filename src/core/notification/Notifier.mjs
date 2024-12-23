class Notifier {
  constructor(sender) {
    this.sender = sender
  }

  email(email) {
    this.sender.email(email)
  }

  sms(sms) {
    this.sender.sms(sms)
  }
}

export default Notifier
