import { v4 as uuidv4 } from 'uuid'

class LogLoginUserUseCase {
  constructor(logRepository) {
    this.logRepository = logRepository;
  }


  async execute(logData) {
    const resultLogEntry = await this.logRepository.logsByAction(logData);
    return resultLogEntry;
  }
}

export default LogLoginUserUseCase;
