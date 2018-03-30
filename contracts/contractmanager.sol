pragma solidity ^0.4.0;

import "contractmanagerEnabled.sol";

// The manager contract
contract ContractManager {

    address owner;
    //This is where we keep all the contracts.
    mapping (bytes32 => address) public contracts;

    modifier onlyOwner { //a modifier to reduce code replication
        if (msg.sender == owner) // this ensures that only the owner can access the function
            _;
    }
    // Constructor
    function ContractManager() public{
        owner = msg.sender;
    }

    // Add a new contract to the manager. This will overwrite an existing contract.
    function addContract(bytes32 name, address addr) public returns (bool result) {
      //create new manager and add mgr. address
        ContractManagerEnabled cme = ContractManagerEnabled(addr);
        // Don't add the contract if this does not work.
        //only manager can do this...
        if(!cme.setManagerAddress(address(this))) {
            return false;
        }
        contracts[name] = addr;
        return true;
    }

    //utility for testing
    /* function getManager(address addr) public returns (address res){
      ContractManagerEnabled cme = ContractManagerEnabled(addr);
      return cme.getManager();
    } */

    // Remove a contract from Admin. We could also selfdestruct if we want to.
    function removeContract(bytes32 name) public onlyOwner returns (bool result) {
        if (contracts[name] == 0x0){
            return false;
        }
        contracts[name] = 0x0;
        return true;


    }

    /* //utility function for testing
    function getContract(bytes32 name) public constant returns (address addr) {
        return contracts[name];
    } */


    function remove() public onlyOwner {
      //todo: make less hard coded...
      //predefined contract types...
        address authors = contracts["authors"];
        address ipfs = contracts["ipfs"];
        
        // Remove everything.
        if(authors != 0x0){ ContractManagerEnabled(authors).remove(); }
        if(ipfs != 0x0){ ContractManagerEnabled(ipfs).remove(); }

        // Finally, remove the admin. Admin will now have all the funds of the other contracts,
        // and when suiciding it will all go to the owner.
        selfdestruct(owner);
    }

}
