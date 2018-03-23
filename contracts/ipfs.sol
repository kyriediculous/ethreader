pragma solidity ^0.4.19;

contract IPFS {

   struct Book {
        address author;
        string title;
        string bookHash; //ipfs book hash
        string thumbHash; //ipfs thumbnail hash
        uint timestamp;
    }

    Book[] public books;

    mapping (uint => address) public BookToOwner;
    mapping (address => uint) public OwnerBookCount;

    function addBook(string _bookHash, string _title, string _thumbHash) public {
        uint id = books.push(Book(msg.sender, _title, _bookHash, _thumbHash, now))-1;
        BookToOwner[id] = msg.sender;
        OwnerBookCount[msg.sender]++; ///CONVERT TO SAFEMATH
    }

    function getBooksByAuthor(address _author) external view returns (uint[]) {
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

    function getBookByTitle(string _title) external view returns (address author, string bookHash, string title, string thumbHash) {
        for (uint i = 0; i < books.length; i++) {
         if (keccak256(_title) == keccak256(books[i].title)) return (books[i].author, books[i].bookHash, books[i].title, books[i].thumbHash);
        }
    }
}
