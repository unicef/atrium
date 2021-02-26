require('dotenv').config()
;(async () => {
  const User = require('../models/User')
  const ethers = require('../lib/ethers')
  const mongoose = require('mongoose')
  const EncryptDecrypt = require('../lib/encryptDecrypt')
  const encryptDecrypt = new EncryptDecrypt(process.env.ATRIUM_WALLET_SECRET)
  const md5Hash = require('../lib/hash')
  const { saltAndHashPassword } = require('../lib/users')

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  console.log('mongo connected')

  const email = 'test@unicef.com'
  const emailHash = md5Hash(email)
  const password = 'password'
  const hashedPassword = await saltAndHashPassword(password)
  const newWallet = ethers.createWallet()
  const encryptedWallet = await encryptDecrypt.encrypt(newWallet)

  console.log('seeding user', { email, password })
  const user = new User({
    email,
    emailVerified: true,
    emailHash,
    name: '',
    wallet: encryptedWallet.encrypted,
    address: newWallet.address,
    role: '',
    company: '',
    acceptsEmail: true,
    password: hashedPassword
  })

  return user.save()
})().then(user => {
  console.log(user)
  process.exit(0)
})
