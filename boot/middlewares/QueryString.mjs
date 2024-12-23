function isNumeric(value) {
  const isNumber = !Number.isNaN(
    Number(value)
  )

  const nonNumeric = value.match(/\D/)

  return isNumber && !nonNumeric
}

function isBoolean(value) {
  const booleanValues = ['true', 'false']

  return booleanValues.includes(value.toLowerCase())
}

function parse(value) {
  if (isBoolean(value)) {
    const trueAsString = 'true'

    return value === trueAsString
  }

  if (isNumeric(value)) {
    return Number(value)
  }

  return value
}

export default (request, response, next) => {
  const queryString = request.query

  request.query = Object.entries(queryString)
    .reduce((accumulator, current) => {
      accumulator[current[0]] = parse(current[1])

      return accumulator
    }, {})

  next()
}
