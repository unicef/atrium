const ethers = require('ethers')
const keys = require('../config/keys')
const log = require('../config/log')
const provider = new ethers.providers.JsonRpcProvider({
  url: keys.ETHEREUM_PROVIDER_URL,
  user: keys.ETHEREUM_PROVIDER_USERNAME,
  password: keys.ETHEREUM_PROVIDER_PASSWORD,
  allowInsecure: keys.NODE_ENV === 'development' ? true : false
})

// const provider = ethers.getDefaultProvider();
exports.provider = new ethers.providers.JsonRpcProvider({
  url: keys.ETHEREUM_PROVIDER_URL,
  allowInsecure: keys.NODE_ENV === 'development' ? true : false
})

// Can also set provider (in the getDefaultProvider fn) to:
// 1. homestead
// 2. rinkeby
// 3. ropsten
// 4. kovan
// 5. goerli

// Can also use infura to connect as well, current provider, etc.
// e.g.: let infuraProvider = new ethers.providers.InfuraProvider('ropsten', 'api_access_token');

// WALLETS AND SIGNERS API

// Create wallet:
exports.createWallet = () => {
  return ethers.Wallet.createRandom()
}

// Signing transactions:
// Should be private
exports.signTransaction = transaction => {
  const wallet = new ethers.Wallet(keys.UN_ADMIN_PRIVATE_KEY)
  log.info({ transaction, address: wallet.address }, 'Signing transaction')

  /*
                        Transaction should have the following format... optional:
                        {
                            nonce: 0,
                            gasLimit: 21000,
                            gasPrice: ethers.utils.bigNumberify("20000000000"),

                            to: "0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290",
                            // ... or supports ENS names
                            // to: "ricmoo.firefly.eth",

                            value: ethers.utils.parseEther("1.0"),
                            data: "0x",

                            // This ensures the transaction cannot be replayed on different networks
                            chainId: ethers.utils.getNetwork('homestead').chainId
                        }
                    */
  // Returning a promise
  return wallet.sign(transaction)
}

// Should be private
exports.sendSignedTransaction = signedTransaction => {
  log.debug({ transaction: signedTransaction }, 'Sending signed transaction')
  // Returning a promise
  return provider.sendTransaction(signedTransaction)
}

// Should be private
exports.signText = text => {
  log.info({ text }, 'Signing text')
  const wallet = new ethers.Wallet(keys.UN_ADMIN_PRIVATE_KEY)
  // Returning a promise
  return wallet.signMessage(text)
}
// Should be private
exports.getAccountBalance = () => {
  log.debug('Getting account balance')
  const wallet = new ethers.Wallet(keys.UN_ADMIN_PRIVATE_KEY, provider)
  // Returning a promise
  return wallet.getBalance()
}
// Should be private
exports.getTransactionCount = () => {
  log.debug('Getting transaction count')
  const wallet = new ethers.Wallet(keys.UN_ADMIN_PRIVATE_KEY, provider)
  // Returning a promise
  return wallet.getTransactionCount()
}

// PROVIDERS API

// Public functions that will not expose the private key...
exports.getAccountBalanceSafe = address => {
  log.info({ address }, 'Getting account balance for address')
  return new Promise((resolve, reject) => {
    provider
      .getBalance(address)
      .then(balance => {
        log.info({ address, balance }, 'Balance retrieved successfully')
        resolve(ethers.utils.formatEther(balance))
      })
      .catch(err => {
        log.error({ err, address }, 'Error retrieving balance')
        reject(err)
      })
  })
}

exports.getTransactionCountSafe = address => {
  log.info({ address }, 'Getting transaction count safely for address')
  // returns a promise
  return provider.getTransactionCount(address)
}

// Blockchain status... link this up with Kaleido (or whatever blockchain account we connect to);
// Will be useful for the block explorer...

exports.getBlockchainBlockNumber = () => {
  log.debug('Getting block number')
  // returns a promise
  return provider.getBlockNumber()
}

exports.getBlockchainBlock = blockNumber => {
  log.info({ number: blockNumber }, 'Getting block')
  // returns a promise
  return provider.getBlock(blockNumber)
}

exports.getBlockchainTransaction = transactionHash => {
  log.info({ hash: transactionHash }, 'Getting transaction')
  // returns a promise
  return provider.getTransaction(transactionHash)
}

exports.getBlockchainTransactionReceipt = transactionHash => {
  log.info({ hash: transactionHash }, 'Getting transaction receipt')
  // returns a promise
  return provider.getTransactionReceipt(transactionHash)
}

// CONTRACTS API

// Will be used to deploy all of the ERC 721 smart contracts
exports.deployContractToBlockchain = (abi, bytecode) => {
  log.info({ bytecode, abi }, 'Deploying contract')
  const wallet = new ethers.Wallet(keys.UN_ADMIN_PRIVATE_KEY, provider)
  return (async function() {
    const factory = new ethers.ContractFactory(abi, bytecode, wallet)
    try {
      const contract = await factory.deploy(/* Can put constructor parameters here... */)
      await contract.deployed()
      log.info({ bytecode, abi }, 'Contract deployed correctly')
    } catch (err) {
      log.error(err, 'Error deploying contract')
    }
  })()
}
