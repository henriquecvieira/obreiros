import AWS from 'aws-sdk'

AWS.config.update({
  region: process.env.AWS_REGION ? process.env.AWS_REGION : 'us-east-1'
})

class SMSSender {
  static send(message) {
    const params = {
      Message: message.message,
      PhoneNumber: message.toNumber
    }

    return new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(params)
      .promise()
  }
}

export default SMSSender
