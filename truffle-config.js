/**
 * voilà
 */

const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "detect satoshi rude image ugly dwarf old genre cradle excuse hybrid crowd";

module.exports = {

  networks: {

    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, "wss://mainnet.infura.io/ws/v3/35723fe63d4e4b2e9305713aa352f369"),
      network_id: 1,      
      gas: 10000000,
      gasPrice: 42e9,
      confirmations: 1,  
      timeoutBlocks: 200,  
      skipDryRun: true,
      networkCheckTimeout: 100000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "wss://rinkeby.infura.io/ws/v3/35723fe63d4e4b2e9305713aa352f369"),
      network_id: 4,      
      gas: 10000000,
      gasPrice: 42e9,
      confirmations: 1,  
      timeoutBlocks: 200,  
      skipDryRun: true,
      networkCheckTimeout: 100000
    },

  },
  plugins: ["solidity-coverage"],

  mocha: {},

  compilers: {
    solc: {
      version: "0.4.13",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1500
        }
      }
    }
  }
}