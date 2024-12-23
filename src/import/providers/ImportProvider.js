const SendMailNotification = require('../jobs/SendMailNotification')

exports.boot = (app) => {
  app.locals.scheduleSendMail(
    new SendMailNotification('01 20 06 * * *')
  )
}
