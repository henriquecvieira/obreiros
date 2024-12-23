import AWS from 'aws-sdk'

AWS.config.update({
  region: process.env.AWS_REGION ? process.env.AWS_REGION : 'us-east-1'
})

class EmailSender {
  static send(emailMessage) {
    const params = {
      Destination: {
        ToAddresses: emailMessage.to
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailMessage.html
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: emailMessage.subject
        }
      },
      Source: emailMessage.from
    }

    if (emailMessage.hasTextData()) {
      params.Message.Body.Text = emailMessage.text
    }

    return new AWS.SES({ apiVersion: '2010-12-01' })
      .sendEmail(params)
      .promise()
  }
}

export default EmailSender
