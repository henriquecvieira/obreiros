import BaseException from './BaseException.mjs'
import StatusCode from '../http/StatusCode.mjs'

class DataNotFoundException extends BaseException {
  constructor(message = 'Data not found') {
    super(StatusCode.NOT_FOUND(), message, true)
  }
}

export default DataNotFoundException
