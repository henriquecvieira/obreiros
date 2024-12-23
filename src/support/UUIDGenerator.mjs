import MUUID from 'uuid-mongodb'

class UUIDGenerator {
  static generate() {
    return MUUID.v4()
  }

  static from(uuid) {
    return MUUID.from(uuid)
  }
}

export default UUIDGenerator
