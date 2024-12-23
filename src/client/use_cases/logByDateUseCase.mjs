import { v4 as uuidv4 } from 'uuid'

class LogByDate {
  constructor(logRepository) {
    this.logRepository = logRepository;
  }


  async execute(logData) {
    const resultLogEntry = await this.logRepository.logsByDate(logData);
    return resultLogEntry;
  }
}

export default LogByDate
