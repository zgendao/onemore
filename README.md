# onemore
is a provably fair dice game ported to the [Harmony](http://harmony.one) blockchain.

# Install instructions

## Requirements

* nodejs v12.18.1
* truffle
* solidity v0.5.0

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
[Original source code](https://github.com/FeiShepherd/ethereum-dice)

[How to port something to Ethereum](https://github.com/ivorytowerdds/harmony-punks)

[Stole funds from Gupadhyaya for deployment](https://github.com/gupadhyaya/soccerplayers/blob/master/.env)

Inspiration credited to [@MaggieWangHarm1](https://twitter.com/MaggieWangHarm1)
