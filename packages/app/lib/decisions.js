const ethers = require('ethers')
const keys = require('../config/keys')
const customHttpProvider = new ethers.providers.JsonRpcProvider({
  url: keys.ETHEREUM_PROVIDER_URL,
  allowInsecure: keys.NODE_ENV === 'development' ? true : false
})

const address = '0x449d2fbba032abf1f3c9a9a4433be53b980ef32d'
// const abi = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "decisionToOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "ownerDecisionCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "decisions", "outputs": [ { "name": "pollId", "type": "string" }, { "name": "twitterLink", "type": "string" }, { "name": "topic", "type": "string" }, { "name": "pollResult", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "certId", "type": "uint256" }, { "indexed": false, "name": "pollId", "type": "string" }, { "indexed": false, "name": "twitterLink", "type": "string" }, { "indexed": false, "name": "topic", "type": "string" }, { "indexed": false, "name": "pollResult", "type": "string" } ], "name": "NewDecision", "type": "event" }, { "constant": false, "inputs": [ { "name": "_pollId", "type": "string" }, { "name": "_twitterLink", "type": "string" }, { "name": "_topic", "type": "string" }, { "name": "_pollResult", "type": "string" } ], "name": "_createDecision", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "_getDecision", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_getOwnerCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
const abi = require('../contracts/build/Decisions.json').abi

const Poll = require('../models/Poll')
const User = require('../models/User')

// Will have to load the private key to sign all transactions

// create a wallet (var wallet = new ethers.Wallet(privateKey, provider))
// create contract instance (new ethers.Contract(address, abi, wallet))

// create decision
exports.createDecision = async (userName, pollId, topic, pollResult) => {
  // Need to actually pass in name
  return User.findOne({ name: userName })
    .then(() => {
      // console.log(user)
      // const wallet = new ethers.Wallet(user.wallet.privateKey, customHttpProvider)
      const wallet = new ethers.Wallet(
        keys.UN_ADMIN_PRIVATE_KEY,
        customHttpProvider
      )
      const contract = new ethers.Contract(address, abi, wallet)
      return contract._createDecision(
        pollId.toString(),
        topic.toString(),
        pollResult.toString()
      )
    })
    .catch(err => {
      console.log('Decision did not get created properly')
      console.log(err)
    })
}

exports.getAllDecisionsFromBlockchain = async user_id => {
  return Poll.find({ completed: true })
    .select({ _id: 1, completed: 1, choices: 1 })
    .then(polls => {
      console.log('Look for all polls')
      return User.findById(user_id)
        .then(() => {
          console.log('Finding user by user id')
          // const wallet = new ethers.Wallet(user.wallet.privateKey, customHttpProvider)
          const wallet = new ethers.Wallet(
            keys.UN_ADMIN_PRIVATE_KEY,
            customHttpProvider
          )
          const contract = new ethers.Contract(address, abi, wallet)
          const arrayOfPromises = []
          polls.forEach(async (poll, key) => {
            console.log(key)
            arrayOfPromises.push(contract._getDecision(key))
          })
          return arrayOfPromises
        })
        .catch(() => {
          console.log('User not found')
        })
    })
    .catch(err => {
      console.log('Polls not found', err)
    })
}
