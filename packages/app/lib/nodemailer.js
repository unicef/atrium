require('dotenv').config()
const log = require('../config/log')

// New adds because of AWS SES:
const ses = require('node-ses')
const { AWS_SES_ACCESS_KEY, AWS_SES_SECRET_KEY } = process.env
const client = ses.createClient({
  key: AWS_SES_ACCESS_KEY,
  secret: AWS_SES_SECRET_KEY
})

exports._sendWelcomeEmail = async (email, emailHash, invitationCode) => {
  log.info({ email }, 'Sending welcome email')
  client.sendEmail(
    {
      to: `${email}`,
      from: 'noreply@atrium.network',
      subject: 'Welcome to The Atrium platform! Please confirm your email.',
      cc: ['mhydary@unicef.org'],
      message: `
      <div>
          <p>Hi there! Welcome to The Atrium platform.</p>
          <p>Please click on the <a href=${`${process.env.CLIENT_URL ||
            'https://atrium.unicef.io'}` +
            `/register?hash=${emailHash}&code=${invitationCode}`}>link below to complete your registration!</a></p>
            <p>This invitation link will expire in 48 hours or if a new invitation is requested. You can always request a new invitation if you have not completed the sign-up process</p>
      </div>
        `
    },
    function(err, data, res) {
      // ...
      console.log(err)
      console.log(data)
      console.log(res)
    }
  )
}

exports._sendForgotPasswordEmail = async (email, token) => {
  log.info({ email }, 'Sending forgot password email')
  client.sendEmail(
    {
      to: `${email}`,
      from: 'noreply@atrium.network',
      subject: 'Please reset your password on the Atrium.',
      cc: ['mhydary@unicef.org'],
      message: `
            <div>
                <p>Hi there!</p>
                <p>Please click on the <a href=${`${process.env.CLIENT_URL ||
                  'https://atrium.unicef.io'}` +
                  `/reset-password?token=${token}`}>link below to reset your password!</p>
            </div>
        `
      // message: 'Sent from SES. Did this go to spam?'
    },
    function(err, data, res) {
      // ...
      console.log(err)
      console.log(data)
      console.log(res)
    }
  )
}

exports._notifyDeletedContentByAdmin = async (email, type, content) => {
  log.info(
    { email },
    'Sending notification email of a deleted reported content'
  )
  client.sendEmail(
    {
      to: `${email}`,
      from: 'noreply@atrium.network',
      subject: `Your ${type} has been deleted from Atrium.`,
      cc: ['mhydary@unicef.org'],
      message: `
            <div>
                <p>Hi there!</p>
                <p>Your ${type} has been reported and an admin reviewed it, according to our guidelines it has been deleted.</p>
                <p>${type}</p>
                <blockquote>${content}</blockquote>
            </div>
        `
      // message: 'Sent from SES. Did this go to spam?'
    },
    function(err, data, res) {
      // ...
      console.log(err)
      console.log(data)
      console.log(res)
    }
  )
}

exports._actionOnYourContent = async (
  email,
  type,
  actionType,
  place,
  person,
  content
) => {
  log.info({ email }, 'Sending notification email of an action on content')
  client.sendEmail(
    {
      to: `${email}`,
      from: 'noreply@atrium.network',
      subject: `${type} has been ${actionType} on your ${place}.`,
      cc: ['mhydary@unicef.org'],
      message: `
            <div>
                <p>Hi there!</p>
                <p>${person} ${content}</p>
            </div>
        `
    },
    function(err, data, res) {
      // ...
      console.log(err)
      console.log(data)
      console.log(res)
    }
  )
}
