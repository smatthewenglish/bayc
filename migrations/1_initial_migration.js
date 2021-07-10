/**
 * @dev Deployment configuration.
 */

// const BuilderShop = artifacts.require("BuilderShop");

// let niftyRegistryContract = "0xCefBf44ff649B6E0Bc63785699c6F1690b8cF73b"; //Rinkeby

// let defaultOwner = "0xBDbAEe6326cF7164EDaf107C525c1928B66d133f";

// module.exports = function(deployer) {
// 	deployer.deploy(
// 		BuilderShop,
// 		niftyRegistryContract,
// 		defaultOwner
// 	);
// };

const WyvernExchange = artifacts.require("WyvernExchange");

module.exports = function (deployer) {
  deployer.deploy(WyvernExchange);
};
