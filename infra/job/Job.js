class Job {
  constructor(name, executionTime) {
    this._name = name
    this._execution_time = executionTime
  }

  get name() {
    return this._name
  }

  get executionTime() {
    return this._execution_time
  }

  onStartCallback() {
    const now = new Date()
    return () => console.info(`Trabalho "${this._name}" iniciado em ${now.toISOString()}`)
  }

  onCompleteCallback() {
    const now = new Date()
    return () => console.info(`Trabalho "${this._name}" finalizado em ${now.toISOString()}`)
  }

  handle() {
    throw new Error(`O método handle() deve ser implementado para a tarefa agendada "${this._name}".`)
  }
}

module.exports = Job
