# onemore
is a provably fair dice game ported to the [Harmony](http://harmony.one) blockchain.

# Install instructions

## Requirements

* nodejs v12.18.1
* truffle
* solidity v0.4.11

## Guide

* Install dependencies
```
npm install
```
* Add an .env file
```
MAINNET_PRIVATE_KEY=[PRIVATE KEY]
MAINNET_MNEMONIC=[MNEMONIC]
MAINNET_0_URL='https://api.s0.t.hmny.io'

GAS_LIMIT=9321900
GAS_PRICE=1000000000
```

* Compile
```
truffle compile
```

* Deploy
```
truffle migrate --network mainnet --reset
```

```
truffle exec test/test.js --network mainnet
```

## Credits
https://github.com/FeiShepherd/ethereum-dice

Inspiration credited to @Maggie_Wang
