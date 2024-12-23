class StatusCode {
  static get OK() {
    return 200
  }

  static get CREATED() {
    return 201
  }

  static get ACCEPTED() {
    return 202
  }

  static get NO_CONTENT() {
    return 204
  }

  static get MOVED_PERMANENTLY() {
    return 301
  }

  static get MOVED_TEMPORARILY() {
    return 302
  }

  static BAD_REQUEST() {
    return 400
  }

  static get UNAUTHORIZED() {
    return 401
  }

  static get FORBIDDEN() {
    return 403
  }

  static NOT_FOUND() {
    return 404
  }

  static get METHOD_NOT_ALLOWED() {
    return 405
  }

  static INTERNAL_SERVER_ERROR() {
    return 500
  }

  static all() {
    return [
      StatusCode.OK,
      StatusCode.CREATED,
      StatusCode.ACCEPTED,
      StatusCode.NO_CONTENT,
      StatusCode.MOVED_PERMANENTLY,
      StatusCode.MOVED_TEMPORARILY,
      StatusCode.BAD_REQUEST,
      StatusCode.UNAUTHORIZED,
      StatusCode.FORBIDDEN,
      StatusCode.NOT_FOUND,
      StatusCode.METHOD_NOT_ALLOWED,
      StatusCode.INTERNAL_SERVER_ERROR
    ]
  }
}

export default StatusCode
