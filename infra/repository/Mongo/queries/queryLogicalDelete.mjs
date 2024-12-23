import { UUID } from "mongodb"

const query = (_id) => {
  return {
    filter: { _id: new UUID(_id) },
    update: {
      $set: {
        active: false,
        "dates.lastUpdateDate": new Date(),
      },
    },
  }
}

export default {
  query,
}
