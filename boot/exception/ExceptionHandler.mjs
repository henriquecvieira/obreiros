/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

import Application from '../../src/support/Application.mjs'
import BaseException from '../../src/core/exceptions/BaseException.mjs';

function handleRejection(reason, promise) {
  console.error('Unhandled Rejection at: ', reason)
  throw reason
}

function handleException(error) {
  console.error('Uncaught Exception thrown', error.message)

  if (!isTrustedError(error)) {
    process.exit(1)
  }
}

function handleError(error, request, response, next) {
  const status = error.httpCode || 500

  const responseObject = {
    status,
    message: status === 400 ? JSON.parse(error.message): error.message
  }

  if (!Application.isInProductionMode()) {
    responseObject.stack = error.stack || null
  }
  console.log(responseObject)

  return response
    .status(status)
    .json(responseObject)
}

function handleSigterm(server) {
  console.info('SIGTERM signal received.')
  console.info('Closing http server.')

  server.close(() => {
    console.log('Http server closed.')
  })


}

function isTrustedError(error) {
  if (error instanceof BaseException) {
    return error.isOperational
  }

  return false
}

export default {
  handle: (app, server) => {
    process.on('unhandledRejection', handleRejection)

    process.on('uncaughtException', handleException)

    process.on('SIGTERM', () => handleSigterm(server))

    process.on('SIGINT', () => handleSigterm(server))

    app.use(handleError)
  }
}
