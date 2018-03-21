pragma solidity ^0.4.20;

import './ownable.sol';

contract Blacklist is Ownable {
    mapping (address => bool) public blacklist;

    modifier notBlacklisted (address _author) {
        require(!blacklist[_author]);
        _;
    }

    function addToBlacklist(address _author) external onlyOwner {
        blacklist[_author] = true;
    }

    function addManyToBlacklist(address[] _authors) external onlyOwner {
        for (uint i = 0; i < _authors.length; i++) {
            blacklist[_authors[i]] = true;
        }
    }

    function removeFromBlacklist(address _author) external onlyOwner {
        blacklist[_author] = false;
    }
}
