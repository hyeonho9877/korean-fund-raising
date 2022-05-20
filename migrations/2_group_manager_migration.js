const groupManager = artifacts.require("GroupManager");

module.exports = function (deployer) {
    deployer.deploy(groupManager);
};
