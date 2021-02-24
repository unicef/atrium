const crypto = require('crypto')

class EncryptDecrypt {
  constructor(secret) {
    this.secret = secret
  }
  encrypt(data) {
    return new Promise((resolve, reject) => {
      let encrypted
      try {
        const cipher = crypto.createCipher('aes-256-cbc', this.secret)
        encrypted = Buffer.concat([
          cipher.update(Buffer.from(JSON.stringify(data), 'utf8')),
          cipher.final()
        ])
      } catch (e) {
        const { message } = e
        reject({ message })
      }

      resolve({ encrypted })
    })
  }
  decrypt(encrypted) {
    return new Promise((resolve, reject) => {
      try {
        const decipher = crypto.createDecipher('aes-256-cbc', this.secret)
        const decrypted = Buffer.concat([
          decipher.update(encrypted),
          decipher.final()
        ])
        resolve(JSON.parse(decrypted.toString()))
      } catch (exception) {
        reject({ message: exception.message })
      }
    })
  }
}

module.exports = EncryptDecrypt
