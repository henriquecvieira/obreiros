const db = require('../../../common/db.js')

exports.deactivateSupervisors = async (usersCollection) => {
  const findQuery = {
    user: { $in: usersCollection }
  }

  const updateQuery = {
    $set: {
      isActive: false,
      deactivatedAt: new Date()
    }
  }
  console.log(
    findQuery,
    updateQuery
  )
  return new Promise((resolve, reject) => {
    db.collection('users')
      .updateMany(
        findQuery,
        updateQuery,
        { upsert: false }
      )
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
