const updatePasswordQuery = (userId, hashedPassword) => ({
  filter: { _id: mongodb.ObjectId(userId) },
  update: {
    $set: {
      password: hashedPassword,
      "dates.lastUpdateDate": new Date(),
      resetToken: null,
    },
  },
})
