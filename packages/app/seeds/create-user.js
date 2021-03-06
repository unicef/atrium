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
  const name = 'Jhon Doe'
  const emailHash = md5Hash(email)
  const password = 'password'
  const hashedPassword = await saltAndHashPassword(password)
  const newWallet = ethers.createWallet()
  const encryptedWallet = await encryptDecrypt.encrypt(newWallet)

  const email2 = 'test2@unicef.com'
  const name2 = 'Jimmy Doe'
  const emailHash2 = md5Hash(email2)
  const password2 = 'password'
  const hashedPassword2 = await saltAndHashPassword(password2)
  const newWallet2 = ethers.createWallet()
  const encryptedWallet2 = await encryptDecrypt.encrypt(newWallet2)

  const email3 = 'newemail@unicef.com'
  const emailHash3 = md5Hash(email3)
  const password3 = 'password'
  const hashedPassword3 = await saltAndHashPassword(password3)
  const newWallet3 = ethers.createWallet()
  const encryptedWallet3 = await encryptDecrypt.encrypt(newWallet3)

  const adminEmail = 'un-innovation@unicef.org'
  const adminEmailHash = md5Hash(adminEmail)
  const adminPassword = process.env.ADMIN_LONG_PASSWORD || 'itwillbealongpassword'
  const adminHashedPassword = await saltAndHashPassword(adminPassword)
  const adminWallet = ethers.createWallet()
  const adminEncryptedWallet = await encryptDecrypt.encrypt(adminWallet)

  const user2 = new User({
    email: email2,
    name: name2,
    emailVerified: true,
    emailHash: emailHash2,
    wallet: encryptedWallet2.encrypted,
    address: newWallet2.address,
    role: 'Developer',
    company: '',
    acceptsEmail: true,
    password: hashedPassword2
  })
  await user2.save()

  const user3 = new User({
    email: email3,
    emailVerified: true,
    emailHash: emailHash3,
    name: 'Victor Zabrovskiy',
    wallet: encryptedWallet3.encrypted,
    address: newWallet3.address,
    role: 'Product Manager',
    company: '',
    acceptsEmail: true,
    password: hashedPassword3
  })
  await user3.save()

  const admin = new User({
    email: adminEmail,
    emailVerified: true,
    emailHash: adminEmailHash,
    name: 'Admin Admin',
    wallet: adminEncryptedWallet.encrypted,
    address: adminWallet.address,
    role: 'Admin',
    company: '',
    acceptsEmail: true,
    password: adminHashedPassword,
    isAdmin: true
  })
  await admin.save()

  console.log('seeding user', { email, password })
  const user = new User({
    email,
    emailVerified: true,
    emailHash,
    name: name,
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
