// Usage:
// const address = '0x1eF7F61E5678b6E8B71d92828f9546Deb03bFDa3';
// Check if address has badge of type 1
// console.log(await badges.hasBadge(1, address))
// Give address badge of type 1
// await badges.issueBadge(1, address);
// Check that badge had been issued
// console.log(await badges.hasBadge(1, address))

const keys = require('../config/keys')
const ethers = require('ethers')
const abi = require('../contracts/build/Badge.json').abi
const { BADGE_ENUM } = require('../config/unin-constants')
const log = require('../config/log')

// let provider = new ethers.providers.JsonRpcProvider({url: keys.ETHEREUM_PROVIDER_URL, user: keys.ETHEREUM_PROVIDER_USERNAME, password: keys.ETHEREUM_PROVIDER_PASSWORD});
const provider = new ethers.providers.JsonRpcProvider({
  url: keys.ETHEREUM_PROVIDER_URL,
  allowInsecure: keys.NODE_ENV === 'development' ? true : false
})
const badgeContracts = {
  [BADGE_ENUM.MEMBER]: new ethers.Contract(keys.BADGE_1_ADDRESS, abi, provider),
  [BADGE_ENUM.CONTRIBUTOR]: new ethers.Contract(
    keys.BADGE_2_ADDRESS,
    abi,
    provider
  ),
  [BADGE_ENUM.INFLUENCER]: new ethers.Contract(
    keys.BADGE_3_ADDRESS,
    abi,
    provider
  )
  // 4: new ethers.Contract(keys.BADGE_4_ADDRESS, abi, provider)
}

console.log('Badge 1 accesses at', keys.BADGE_1_ADDRESS)
console.log('Badge 2 accesses at', keys.BADGE_2_ADDRESS)
console.log('Badge 3 accesses at', keys.BADGE_3_ADDRESS)
console.log('Badge 4 accesses at', keys.BADGE_4_ADDRESS)

const generateBadgeRef = () => {
  return Math.round(Math.random() * 1000000000000)
}

exports.issueBadge = async (badgeId, address) => {
  log.info({ badgeId, address }, 'Issuing badge')
  const wallet = new ethers.Wallet(keys.UN_ADMIN_PRIVATE_KEY, provider)
  const badgeContract = badgeContracts[badgeId].connect(wallet)
  log.debug({ badgeId }, 'Contract retrieved correctly')

  const badgeRef = generateBadgeRef()
  log.debug({ badgeId, badgeRef }, 'Badge ref')

  return await badgeContract.mint(address, badgeRef, { gasLimit: 9900000 })
}

exports.hasBadge = async (badgeId, address) => {
  // log.info({ badgeId, address }, 'checking badges')
  // const bal = await badgeContracts[badgeId].balanceOf(address)
  // log.info(`Address ${address} has balance of ${bal} in badge ${badgeId}`)
  // return bal > 0
  return false
}
