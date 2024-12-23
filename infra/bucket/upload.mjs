/* eslint-disable consistent-return */
/* eslint-disable func-names */
import multer from 'multer'
import multerConfig from './multer.mjs'

const upload = multer(multerConfig).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'file', maxCount: 1 },
  { name: 'pictureLocation', maxCount: 1 },
  { name: 'carFile', maxCount: 1 },
  { name: 'sanitaryPlan', maxCount: 1 }
])

export async function store(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.table({ error: err.message, param: err.field })
      return res.status(400).json({ error: err.message, param: err.field })
    } if (err) {
      console.table({ error: err })
      return res.status(400).json(err)
    }
    next()
  })
}
