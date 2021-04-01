const Migrations = artifacts.require('Migrations')
const Badge = artifacts.require('Badge')
const fs = require('fs')

const address = '0xE2238F40b2f05CaA70aCB16591C5C1d7Ae1d09DF'

const badgesAddresses = {}

module.exports = async function(deployer) {
  await deployer.deploy(Migrations)
  badgesAddresses['Migrations'] = Migrations.address
  console.log('Migrations', Migrations.address)
  await deployer.deploy(Badge, address)
  badgesAddresses['Badge1'] = Badge.address
  console.log('Badge1', Badge.address)
  await deployer.deploy(Badge, address)
  badgesAddresses['Badge2'] = Badge.address
  console.log('Badge2', Badge.address)
  await deployer.deploy(Badge, address)
  badgesAddresses['Badge3'] = Badge.address
  console.log('Badge3', Badge.address)
  await deployer.deploy(Badge, address)
  badgesAddresses['Badge4'] = Badge.address
  console.log('Badge4', Badge.address)

  console.log(`writing contracts to ${process.env.CTR_ADDR_PATH}`)
  fs.writeFile(
    process.env.CTR_ADDR_PATH,
    JSON.stringify(badgesAddresses),
    err => {
      if (err) return console.log(err)
    }
  )
}
