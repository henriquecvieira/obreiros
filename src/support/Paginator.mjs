class Paginator {
  constructor(records) {
    this._records = records
  }

  paginate(page, limit) {
    const offset = (page - 1) * limit

    return {
      data: this._records.slice(offset, offset + limit),
      meta: {
        page: page,
        limit: limit,
        pages: Math.ceil(this._records.length / limit),
        records: this._records.length
      }
    }
  }
}

export default Paginator
