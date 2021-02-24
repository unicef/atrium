const Migrations = artifacts.require("Migrations");
const Badge = artifacts.require("Badge")

const address = '0xE2238F40b2f05CaA70aCB16591C5C1d7Ae1d09DF'

module.exports = async function(deployer) {
  deployer.deploy(Migrations).then(()=> console.log("Migrations", Migrations.address));
  await deployer.deploy(Badge, address);
  console.log("Badge1", Badge.address)
  await deployer.deploy(Badge, address);
  console.log("Badge2", Badge.address)
  await deployer.deploy(Badge, address);
  console.log("Badge3", Badge.address)
  await deployer.deploy(Badge, address);
  console.log("Badge4", Badge.address)
};
