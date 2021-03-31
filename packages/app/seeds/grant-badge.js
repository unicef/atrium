require('dotenv').config()
const ethers = require('../lib/ethers')
const badges = require('../lib/badges')

const checkBadge = async address => {
  try {
    const result = await badges.hasBadge(1, address)
    console.log(result)
  } catch (err) {
    console.log('Error on get')
    console.log(err)
  }
}

const issueBadge = async address => {
  try {
    const issueResult = await badges.issueBadge(1, address)
    console.log(issueResult)
  } catch (err) {
    console.log('Error on issue')
    console.log(err)
  }
}

const seedBadge = async () => {
  const newWallet = ethers.createWallet()
  console.log('NEW WALLET ADDRESS', newWallet.address)
  await issueBadge(newWallet.address)

  // wait for transaction to be mined- Parity-solo has 1 second block
  setTimeout(() => checkBadge(newWallet.address), 3000)
}

seedBadge()
