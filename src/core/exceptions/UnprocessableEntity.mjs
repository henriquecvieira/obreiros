import BaseException from './BaseException.mjs'
import StatusCode from '../http/StatusCode.mjs'

class UnprocessableEntity extends BaseException {
  constructor(message = 'Unable to process instructions.') {
    super(StatusCode.UNAUTHORIZED, message, true)
  }
}

export default UnprocessableEntity
