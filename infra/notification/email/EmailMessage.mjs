class EmailMessage {
  constructor(from, to, subject, html) {
    this._from = from
    this._to = to
    this._subject = subject
    this._html = html
    this._text = ''
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

  get html() {
    return this._html
  }

  get text() {
    return this._text
  }

  set text(text) {
    this._text = text
  }

  hasTextData() {
    return !!this._text
  }
}

export default EmailMessage
