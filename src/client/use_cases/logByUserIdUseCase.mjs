class LogByUserId {
  constructor(logRepository) {
    this.logRepository = logRepository;
  }


  async execute(data) {
    const resultLogEntry = await this.logRepository.logsByUserId(data);
    return resultLogEntry;
  }
}

export default LogByUserId
