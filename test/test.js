const DiceContract = artifacts.require('DiceContract')
const truffleAssert = require('truffle-assertions')

const DEPOSIT_BALANCE = 1000
const PAYOUT_MULTIPLIER = 2

contract('DiceContract', async accounts => {
  let instance, contractAddress
  beforeEach(async () => {
    instance = await DiceContract.new({from: accounts[0]})
    contractAddress = instance.contract._address
    await instance.deposit({value: DEPOSIT_BALANCE})
  })

  afterEach(async () => {
    await instance.kill({from: accounts[0]})
  })

  it('should deposit funds into bank', async () => {
    let balance = await web3.eth.getBalance(instance.contract._address)
    assert.equal(balance, DEPOSIT_BALANCE)
  })
  it('should send correct amount', async () => {
    const oldBalances = {
      gambler: reduceBigNumber(await web3.eth.getBalance(accounts[1])),
      contract: parseInt(await web3.eth.getBalance(contractAddress)),
    }
    let dice = {
      lost: 0,
      won: 0,
      done: false,
      bet: 100,
      odds: 2,
    }

    while (dice.won < 4 || dice.lost < 4) {
      const result = await instance.sendTransaction({
        from: accounts[1],
        value: dice.bet,
      })
      if (getEvent(result) === 'Won') {
        dice.won++
      } else {
        dice.lost++
      }
    }

    const newBalances = {
      gambler: reduceBigNumber(await web3.eth.getBalance(accounts[1])),
      contract: parseInt(await web3.eth.getBalance(instance.contract._address)),
    }
    assert.equal(
      oldBalances.gambler + oldBalances.contract,
      newBalances.gambler + newBalances.contract,
    )
    assert.equal((dice.won - dice.lost) * dice.bet, newBalances.gambler - oldBalances.gambler)
  })
  it('should throw if amount sent is above balance/2', async () => {
    let message
    try {
      let result = await instance.sendTransaction({
        from: accounts[0],
        value: DEPOSIT_BALANCE,
      })
    } catch (err) {
      message = err.message
    }
    assert.equal(typeof message, 'string')
  })
})

const getEvent = result => {
  return result.logs[0].event
}

const subtractBigNumber = (number1, number2) => {
  return reduceBigNumber(number1) - reduceBigNumber(number2)
}

const reduceBigNumber = number => {
  number = number.toString()
  return parseInt(number.substr(number.length - 5, number.length))
}
