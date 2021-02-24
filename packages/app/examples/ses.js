require('dotenv').config()
const ses = require('node-ses')

const { AWS_SES_ACCESS_KEY, AWS_SES_SECRET_KEY } = process.env
const client = ses.createClient({
  key: AWS_SES_ACCESS_KEY,
  secret: AWS_SES_SECRET_KEY
})

/*
client.sendEmail(
  {
    to: 'asherbuck@unicef.org',
    from: 'noreply@atrium.network',

    subject: 'Atrium test email',
    message: 'Sent from SES. Did this go to spam?'
  },
  function(err, data, res) {
    // ...
    console.log(err)
    console.log(data)
    console.log(res)
  }
)

cc: [
      'mhydary@unicef.org',
      'gustav.stromfelt@wfp.org',
      'clomazzo@unicef.org'
    ],
    */

module.exports = client
