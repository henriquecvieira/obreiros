class Email {
  constructor(from, to, subject, message) {
    this._from = from
    this._to = to
    this._subject = subject
    this._message = message
  }

  get from() {
    return this._from
  }

  get to() {
    return this._to
  }

  get subject() {
    return this._subject
  }

  get message() {
    return this._message
  }
}

export default Email
