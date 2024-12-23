class BaseException extends Error {
  constructor(httpCode, message, isOperational) {
    super(message)

    this._httpCode = httpCode
    this._isOperational = isOperational

    Error.captureStackTrace(this)
  }

  get httpCode() {
    return this._httpCode
  }

  get isOperational() {
    return this._isOperational
  }
}

export default BaseException
