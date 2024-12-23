import Notifier from './Notifier.mjs'

let notifier

function boot(notifierImpl) {
  notifier = new Notifier(notifierImpl)
}

export {
  boot,
  notifier as Notifier
}
