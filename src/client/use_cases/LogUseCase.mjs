import { v4 as uuidv4 } from 'uuid'

class LogUserActivityUseCase {
  constructor(logRepository) {
    this.logRepository = logRepository;
  }


  async logAction(logData) {
    const logEntry = {
      _id: uuidv4(),
      userId: logData.userId,
      action: logData.action || 'unknown',
      timestamp: new Date(),
      ipAddress: logData.ipAddress || 'unknown',
      additionalData: {
        success: logData.success || false,
        ...logData.additionalData,
      },
    };

    await this.logRepository.saveLog(logEntry);
    return logEntry;
  }
}

export default LogUserActivityUseCase;
