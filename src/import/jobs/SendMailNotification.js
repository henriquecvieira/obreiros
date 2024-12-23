const Job = require('../../../infra/job/Job')
const SendMailNotifications = require('../services/SendMailNotifications')

class SendMailNotification extends Job {
  constructor(executionTime) {
    super('Notificações enviadas', executionTime)
  }

  // eslint-disable-next-line class-methods-use-this
  handle() {
    return () => {
      SendMailNotifications.sendmail()
    }
  }
}

module.exports = SendMailNotification
