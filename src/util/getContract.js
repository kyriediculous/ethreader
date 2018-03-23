import Web3 from 'web3'
import contract from 'truffle-contract'
import IPFS from '../../build/contracts/IPFS.json'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let myContract = contract(IPFS)
  myContract.setProvider(web3.currentProvider)
  myContract.defaults({from: web3.eth.accounts[0]})
  myContract.deployed().then(result => {
    let contractInstance = () => result
    resolve(contractInstance)
  }).catch(e => {
     reject(new Error(e))
  })
})

export default getContract
