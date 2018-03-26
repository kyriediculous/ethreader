pragma solidity ^0.4.19;

import './authors.sol';

contract IPFS is Authors{

   struct Book {
        address authorAddress;
        string title;
        string bookHash; //ipfs book hash
        string thumbHash; //ipfs thumbnail hash
        uint timestamp; //Time of publishing
        bytes32 IPPR; //Interplanetary Publishing Reference
    }

    Book[] public books;

    mapping (uint => address) public BookToOwner;
    mapping (address => uint) public OwnerBookCount;

    function addBook(string _bookHash, string _title, string _thumbHash) public returns (bool success) {
        //Check if author is registered
        require(authors[msg.sender].registered);
        //Check if book exists on contract
        if (!_bookExists(_bookHash)) {
            uint _timestamp = now;
            bytes32 _IPPR = keccak256(msg.sender, _title, authors[msg.sender].fullName);
            uint id = books.push(Book(msg.sender, _title, _bookHash, _thumbHash, _timestamp, _IPPR))-1;
            BookToOwner[id] = msg.sender;
            OwnerBookCount[msg.sender]++; ///CONVERT TO SAFEMATH
            return true;
        } else {
           return false;
        }
    }

    function _bookExists(string _bookHash) internal view returns (bool) {
        bytes32 check = keccak256(_bookHash);
        for (uint i = 0; i < books.length; i++) {
           if (check == keccak256(books[i].bookHash)) return true;
        }
        return false;
    }

    function getBooksByAuthor(address _author) internal view returns (uint[]) {
        uint[] memory result = new uint[](OwnerBookCount[_author]);
        uint counter = 0;
        for (uint i = 0; i < books.length; i++) { //CONVERT TO SAFEMATH
          if (BookToOwner[i] == _author) {
            result[counter] = i;
            counter++; ///CONVERT TO SAFEMATH
          }
        }
        return result;
    }

    function getBooksByAuthorName(string _author) external view returns (uint[], string, string) {
        address author = address(authorAddresses[keccak256(_author)]);
        uint[] memory getBooks = getBooksByAuthor(author);
        return(getBooks, authors[author].fullName, authors[author].email);
    }

    function getBookByTitle(string _title) external view returns (address author, string bookHash, string title, string thumbHash) {
        for (uint i = 0; i < books.length; i++) {
         if (keccak256(_title) == keccak256(books[i].title)) return (books[i].authorAddress, books[i].bookHash, books[i].title, books[i].thumbHash);
        }
    }

    function getBookByHash(string _bookHash) external view returns (string bookHash, string title, address author, bytes32 IPPR) {
        for (uint i = 0; i < books.length; i++) {
         if (keccak256(_bookHash) == keccak256(books[i].bookHash)) return (books[i].bookHash, books[i].title, books[i].authorAddress, books[i].IPPR);
        }
    }
}
