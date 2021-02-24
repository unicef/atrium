require('dotenv').config()
const express = require('express')
const app = express()
const { s3Upload, s3Download } = require('../middleware')

app.use('/upload', s3Upload.single('image'), (req, res) => {
  res.json(req.file)
})

app.use('/download/:s3Key', (req, res) => {
  const { s3Key } = req.params
  const imageStream = s3Download(s3Key)
  imageStream.pipe(res)
})

app.listen(4000, () => {
  console.log(`Listening on port 4000`)
  console.log(`curl -F 'image=@/path/to/file' http://localhost:4000/upload`)
  console.log(`curl http://localhost:4000/download/s3Key`)
})
