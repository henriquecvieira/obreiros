let EventManager = null

function dispatch(event) {
  if (EventManager) {
    EventManager.dispatch(event)
  }
}

function boot(eventManager) {
  EventManager = eventManager
}

export {
  boot,
  dispatch
}
