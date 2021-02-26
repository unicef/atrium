const Migrations = artifacts.require('Migrations')
const Badge = artifacts.require('Badge')
const fs = require('fs')

const address = '0xE2238F40b2f05CaA70aCB16591C5C1d7Ae1d09DF'

const badgesAddresses = {}

module.exports = async function(deployer) {
  await deployer.deploy(Migrations)
  console.log('Migrations', Migrations.address)
  await deployer.deploy(Badge, address)
  console.log('Badge1', Badge.address)
  badgesAddresses['BADGE_1_ADDRESS'] = Badge.address
  await deployer.deploy(Badge, address)
  console.log('Badge2', Badge.address)
  badgesAddresses['BADGE_2_ADDRESS'] = Badge.address
  await deployer.deploy(Badge, address)
  console.log('Badge3', Badge.address)
  badgesAddresses['BADGE_3_ADDRESS'] = Badge.address
  await deployer.deploy(Badge, address)
  console.log('Badge4', Badge.address)
  badgesAddresses['BADGE_4_ADDRESS'] = Badge.address

  let badgeEnvStr = ''
  Object.entries(badgesAddresses).forEach(([key, value]) => {
    badgeEnvStr += key.toUpperCase() + '=' + value + '\n'
  })
  fs.writeFile('.env.contracts', badgeEnvStr, err => {
    if (err) return console.log(err)
  })
}
