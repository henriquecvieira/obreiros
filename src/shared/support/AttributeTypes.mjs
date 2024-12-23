class AttributeTypes {
  static get ADDRESS() {
    return 'address'
  }

  static get PROPERTY() {
    return 'property'
  }

  static get STATUS() {
    return 'status'
  }

  static all() {
    return [
      AttributeTypes.ADDRESS,
      AttributeTypes.PROPERTY,
      AttributeTypes.STATUS
    ]
  }

  static isValid(type) {
    return AttributeTypes.all().includes(type)
  }
}

export default AttributeTypes
