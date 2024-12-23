const DEFAULT_LIMIT = 20
const MIN_LIMIT = 1
const MAX_LIMIT = 50
const DEFAULT_PAGE = 1
const MIN_PAGE = 1

class PaginationCriteria {
  static isNotANumber(number) {
    return Number.isNaN(
      Number(number)
    )
  }

  static limit(limit) {
    const isLowerThanMin = limit < MIN_LIMIT
    const isGreaterThanMax = limit > MAX_LIMIT
    const isNotANumber = PaginationCriteria.isNotANumber(limit)

    const isInvalid = isLowerThanMin || isGreaterThanMax || isNotANumber

    if (isInvalid) {
      return DEFAULT_LIMIT
    }

    return parseInt(limit, 10)
  }

  static page(page) {
    const isLowerThanMin = page < MIN_PAGE
    const isNotANumber = PaginationCriteria.isNotANumber(page)

    const isInvalid = isLowerThanMin || isNotANumber

    if (isInvalid) {
      return DEFAULT_PAGE
    }

    return parseInt(page, 10)
  }

  static from(queryString, args) {
    let limit = queryString.limit || DEFAULT_LIMIT
    let page = queryString.page || DEFAULT_PAGE

    return {
      ...args,
      ...queryString,
      page: PaginationCriteria.page(page),
      limit: PaginationCriteria.limit(limit)
    }
  }
}

export default PaginationCriteria
