import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'

const storageTypes = {
  s3: multerS3({
    s3: new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      params: { ContentType: 'image/jpeg' }
    }),
    bucket: process.env.AWS_S3_BUCKET,
    metadata: (req, file, cb) => {
      if (file.fieldname === 'photo') {
        cb(null, { fieldName: file.fieldname });
        return;
      }

      if (file.fieldname === 'file') {
        cb(null, { fieldName: file.fieldname });
        return;
      }

      if (file.fieldname === 'pictureLocation') {
        cb(null, { fieldName: file.fieldname });
        return;
      }
      if (file.fieldname === 'carFile') {
        cb(null, { fieldName: file.fieldname });
        return;
      }
      if (file.fieldname === 'sanitaryPlan') {
        cb(null, { fieldName: file.fieldname });
        return;
      }

      cb(null, { fieldName: file.fieldname })
    },
    contentType: (req, file, cb) => {
      cb(null, file.mimetype)
    },
    key: (req, file, cb) => {
      crypto.randomBytes(24, (err, hash) => {
        if (err) cb(err)
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    }
  })
}

export default {
  storage: storageTypes.s3,
  limits: {
    fileSize: Number.parseInt(process.env.FILE_SIZE)
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/x-pdf'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
  onError: function (err) {
    console.log('error', err)
  }
}
