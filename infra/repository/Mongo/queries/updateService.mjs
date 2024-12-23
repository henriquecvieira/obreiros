const query = (userId, token) => ({
  _id: userId,
  update: {
    $set: {
      token: token,
      "dates.lastUpdateDate": new Date(),
    },
  },
})

export default {
  query,
}
