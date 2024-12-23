class Volume {
  constructor(repositoryImpl) {
    this.collection = 'milkVolume';
    this.repository = repositoryImpl;
  }

  async save(volume) {
    return this.repository.save(this.collection, volume);
  }

  async remove(volumeId) {
    return this.repository.remove(this.collection, volumeId);
  }

  async findVolumeByIdentifier(identifier) {
    const volume = await this.repository.searchVolumeByIdentifier(identifier);

    if (!volume) {
      return null;
    }
    return volume;
  }

  async findVolumeByDate(identifierProducer, dateFrom, dateTo) {
    const volume = await this.repository.searchVolumeByDate(identifierProducer, dateFrom, dateTo);

    if (!volume) {
      return null;
    }
    return volume;
  }

  async findVolumeSupervisorByDate(params) {
    const volume = await this.repository.searchVolumeSupervisorByDate(params);

    if (!volume) {
      return null;
    }
    return volume;
  }

  async findPriceAverageMonthsSupervisorByDate(params) {
    const volume = await this.repository.searchPriceAverageMonthsSupervisorByDate(params);

    if (!volume) {
      return null;
    }
    return volume;
  }

  async findPriceAverageSupervisorByDate(params) {
    const volume = await this.repository.searchPriceAverageSupervisorByDate(params);

    if (!volume) {
      return null;
    }
    return volume;
  }

  async findDailyAverageSupervisorByDate(params) {
    const volume = await this.repository.searchDailyAverageSupervisorByDate(params);

    if (!volume) {
      return null;
    }
    return volume;
  }

  async findVolumeByDayMetric(params) {
    const volume = await this.repository.searchVolumeByDayMetric(params);

    if (!volume) {
      return null;
    }
    return volume;
  }

  async findVolumeByMonthMetric(params) {
    const volume = await this.repository.searchVolumeByMonthMetric(params);

    if (!volume) {
      return null;
    }
    return volume;
  }

  async getById(id) {
    const volumeDto = await this.repository.get(this.collection, id);

    if (!volumeDto) {
      return null;
    }

    return volumeDto;
  }
}

export default Volume;
