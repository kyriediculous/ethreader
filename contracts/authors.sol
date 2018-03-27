pragma solidity ^0.4.19;

import './libraries/strings.sol';

contract Authors {

  using strings for string;

  struct Author {
    string name;
    string email;
    bool registered;
  }

  mapping (address => Author) public authors;
  mapping(bytes32  => address) public authorAddresses;

  function newAuthor(string _firstName, string _lastName, string _email) external {
    authors[msg.sender].name = _firstName.strConcat(_lastName, true);
    authors[msg.sender].email = _email;
    authors[msg.sender].registered = true;
    authorAddresses[keccak256(_firstName.strConcat(_lastName, true))] = msg.sender;
  }
}
