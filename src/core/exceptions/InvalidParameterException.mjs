import BaseException from './BaseException.mjs'
import StatusCode from '../http/StatusCode.mjs'

class InvalidParameterException extends BaseException {
  constructor(message = 'Invalid parameter') {
    super(StatusCode.BAD_REQUEST(), message, true)
  }
}

export default InvalidParameterException
