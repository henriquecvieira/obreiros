import { UUID } from "mongodb"
const query = (id) => ({
  _id: new UUID(id),
})

export default {
  query,
}
