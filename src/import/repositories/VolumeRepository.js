const db = require('../../../common/db.js')

exports.findAllProducersWithoutVolumeSince = async (date) => {
  const query = []

  query.push({
    $match: {
      start_date: {
        $gt: date,
        $lte: new Date()
      },
      volume: { $gt: 0 }
    }
  })

  query.push({
    $lookup: {
      from: 'users',
      localField: 'code',
      foreignField: 'user',
      as: 'producer'
    }
  })

  query.push({
    $unwind: '$producer'
  })

  query.push({
    $match: {
      'producer.deactivatedAt': { $exists: true }
    }
  })

  query.push({
    $project: {
      code: 1
    }
  })

  return new Promise((resolve, reject) => {
    db.collection('milkVolume')
      .aggregate(query, { allowDiskUse: true })
      .then((resultSet) => resolve(resultSet))
      .catch((error) => reject(error))
  })
}
