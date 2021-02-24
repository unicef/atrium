var Decisions = artifacts.require("./Decisions.sol");

module.exports = function(deployer) {
  deployer.deploy(Decisions);
};
