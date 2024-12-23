import { EventEmitter } from 'events';

class EventoEmitter extends EventEmitter {
  constructor() {
    super();
  }
}

const eventoEmitter = new EventoEmitter();

export default eventoEmitter;
