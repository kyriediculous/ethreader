const CMC = artifacts.require('./CMC');
const UserEntry = artifacts.require('./UserEntry');
const ipfsLogic = artifacts.require('./ipfsLogic');
const ipfsStore = artifacts.require('./ipfsStore')

module.exports = function(deployer) {
  let CMCinstance
  deployer.deploy(CMC)
  .then(() => CMC.deployed())
  .then((instance) => {
    CMCinstance = instance
    return deployer.deploy(UserEntry)
  })
  .then(()  => deployer.deploy(ipfsLogic))
  .then(()  => deployer.deploy(ipfsStore))
  .then(() => UserEntry.deployed())
  .then(instance => {
    CMCinstance.addContract("UserEntry", instance.address)
    return ipfsLogic.deployed()
  })
  .then(instance => {
    CMCinstance .addContract("ipfsLogic", instance.address)
    return ipfsStore.deployed()
  })
  .then(instance => {
    CMCinstance.addContract("ipfsStore", instance.address)
  })
}
