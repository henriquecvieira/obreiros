import { EventEmitter } from 'events'

class EventManager extends EventEmitter {
  constructor() {
    super()
  }

  subscribe(listener) {
    this.on(listener.event, (payload) => listener.notify(payload))
  }

  dispatch(event) {
    this.emit(event.name, event.payload)
  }
}

export default EventManager
