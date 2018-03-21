import Web3 from 'web3'
import contract from 'truffle-contract'
import IPFS from '../../build/contracts/IPFS.json'

let getContract = new Promise(function (resolve, reject) {
  let provider = new Web3.providers.HttpProvider('http://localhost:7545')
  let myContract = contract(IPFS)
  myContract.setProvider(provider)
  myContract.deployed().then(instance => {
    instance = () => instance
    resolve(instance)
  }).catch(e => {
     console.log('getContract.js', e)
  })
})

export default getContract
