class SMS {
  constructor(toNumber, message) {
    this._toNumber = toNumber;
    this._message = message
  }

  get toNumber() {
    return this._toNumber;
  }

  get message() {
    return this._message;
  }
}

export default SMS
