const query = (userId, token, resetTokenExpiresAt) => ({
  filter: { _id: userId },
  update: {
    $set: {
      resetToken: token,
      resetTokenExpiresAt: resetTokenExpiresAt,
      "dates.lastUpdateDate": new Date(),
    },
  },
})

export default {
  query,
}
