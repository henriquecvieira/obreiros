import { UUID } from "mongodb"

const query = (data) => {
  const filter = {}
  if (data._id) {
    filter._id = new UUID(data._id)
  }
  if (data.email) {
    filter["contact.email"] = data.email
  }
  return filter
}

export default {
  query,
}
