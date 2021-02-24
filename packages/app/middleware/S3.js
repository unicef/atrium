const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../config')
const AWS = require('aws-sdk')

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } = process.env

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
})

const s3Upload = multer({
  storage: multerS3({
    s3,
    bucket: AWS_BUCKET_NAME,
    acl: 'private',
    limits: {
      files: 1,
      fileSize: config.uploadLimit
    },
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`)
    }
  })
})

const s3Download = s3Key => {
  return s3
    .getObject({
      Bucket: AWS_BUCKET_NAME,
      Key: s3Key
    })
    .createReadStream()
}

module.exports = {
  s3Upload,
  s3Download
}
