import fs from 'fs'
import { Harmony } from '@harmony-js/core'
import { ChainType, ChainID, isPrivateKey } from '@harmony-js/utils'

// loading setting
const setting = JSON.parse(fs.readFileSync('../setting.json'))

// loading setting from local json file
export const harmony = new Harmony(setting.url, {
  chainType: setting.chainType,
  chainId: setting.chainId
})

// loading Mne phrases from file
const phrases = '01f903ce0c960ff3a9e68e80ff5ffc344358d80ce1c221c3f9711af07f83a3bd' 
// we use default index = 0
const index = 0

let accountImported
if (isPrivateKey(phrases)) {
  let key = phrases.trim()
  accountImported = harmony.wallet.addByPrivateKey(key)
} else {
  accountImported = harmony.wallet.addByMnemonic(phrases, index)
}
// add the phrase and index to Wallet, we get the account,
// and we export it for further usage
export const myAccount = accountImported
