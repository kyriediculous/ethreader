pragma solidity ^0.4.0;

// Base class for contracts that are used in the LoC system.
contract ContractManagerEnabled {
    address MANAGER;

    //provide the address of the general contract manager
    function setManagerAddress(address mgr) public returns (bool result){
        // Once the admin address is set, don't allow it to be set again, except by the
        // MANAGER contract itself.
        if(MANAGER != 0x0 && msg.sender != MANAGER){
            return false;
        }
        MANAGER = mgr;
        return true;
    }

    /* //utility to debug
    function getManager() public returns (address res){
      return MANAGER;
    } */

    // Makes it so that the manager is the only contract that may kill it.
    function remove() public{
        if(msg.sender == MANAGER){
            selfdestruct(MANAGER);
        }
    }

}
