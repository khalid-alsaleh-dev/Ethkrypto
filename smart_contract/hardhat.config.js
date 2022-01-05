// https://eth-ropsten.alchemyapi.io/v2/bbHDRbz4ihW_2vX-_RKYC8xYKbFwZf2X


require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity:'0.8.0',
  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/bbHDRbz4ihW_2vX-_RKYC8xYKbFwZf2X',
      accounts:['cec60988ff5cd8569619d053f36cc44962823b6f09bc16c1b3c5e9a44c284add']
    }

  }
}