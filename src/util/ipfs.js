const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
//run with local daemon
// const ipfs = new IPFS('localhost', '5001', {protocol:'http'});
export default ipfs;
