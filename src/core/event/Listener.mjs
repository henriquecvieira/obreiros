class Listener {
  constructor(eventName) {
    this._event = eventName
  }

  static from() {
    return new this()
  }

  get event() {
    return this._event
  }

  notify() {
    throw new Error(`Must implement method notify on event ${this._event}.`)
  }

  isEqual(listener) {
    return listener.event === this._event
  }
}

export default Listener
