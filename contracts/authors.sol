pragma solidity ^0.4.19;

import './libraries/strings.sol';

contract Authors {

  using strings for string;

  struct Author {
    string firstName;
    string lastName;
    string fullName;
    string email;
    bool registered;
  }

  mapping (address => Author) public authors;

  function newAuthor(string _firstName, string _lastName, string _email) external {
    authors[msg.sender].firstName = _firstName;
    authors[msg.sender].lastName = _lastName;
    authors[msg.sender].fullName = _firstName.strConcat(_lastName, true);
    authors[msg.sender].email = _email;
    authors[msg.sender].registered = true;
  }
}
