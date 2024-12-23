import { UUID } from "mongodb"

const query = ({ _id, newPassword }) => {
  return {
    filter: { _id: new UUID(_id) },
    update: {
      $set: {
        password: newPassword,
        "dates.lastUpdateDate": new Date(),
      },
      $unset: {
        resetToken: "",
        resetTokenExpiresAt: "",
      },
    },
  }
}

export default {
  query,
}
