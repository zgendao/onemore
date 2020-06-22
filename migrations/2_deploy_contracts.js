const DiceContract = artifacts.require("DiceContract");

module.exports = function(deployer) {
  deployer.deploy(DiceContract)
};
