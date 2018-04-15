pragma solidity ^0.4.19;

contract Authors {

  struct Author {
    string name;
    string email;
    bool registered;
  }

  mapping (address => Author) public authors;
  mapping(bytes32  => address) public authorAddresses;

  function newAuthor(string _name, string _email) external {
    require(!authors[msg.sender].registered);
    require(authorAddresses[keccak256(_name)] == 0x0);
    authors[msg.sender].name = _name;
    authors[msg.sender].email = _email;
    authors[msg.sender].registered = true;
    authorAddresses[keccak256(_name)] = msg.sender;
  }
}
