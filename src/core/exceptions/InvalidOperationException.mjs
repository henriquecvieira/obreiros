import BaseException from './BaseException.mjs'
import StatusCode from '../http/StatusCode.mjs'

class InvalidOperationException extends BaseException {
  constructor(message = 'Invalid operation') {
    super(StatusCode.FORBIDDEN, message, true)
  }
}

export default InvalidOperationException
