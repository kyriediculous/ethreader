const IPFS = artifacts.require('IPFS')

contract('ipfs', function(accounts) {
  it('should create a new author', () => {
    let ipfs;
    let _firstName = "John"
    let _lastName = "Doe"
    let _name = _firstName + " " + _lastName
    let _email = "johndoe@example.com"
    let address = accounts[0]
    let result;
    IPFS.deployed().then(instance => {
      ipfs = instance;
      return ipfs.newAuthor.send(_firstName, _lastName, _email)
    }).then(() => {
      return ipfs.authors.call(address)
    }).then(author => {
      assert.equal(_name, author.name, "names aren't equal")
      assert.equal(_email, author.email, "email isn't equal")
      assert.equal(true, author.registered, "user not succesfully registed")
    })
  })
  it('should upload a book when the author is registered and book does not exist', () => {
    IPFS.deployed().then(instance => {
      let _bookHash = '123abcd'
      let _title = 'test book'
      let _thumbnail = '456efgh'
      return instance.addBook.send(_bookHash, _title, _thumbnail)
    }).then(res => {
      assert.equal(true, res, 'Book is not uploaded')
    })
  })
  it('Should get book by author name', () => {
    let ipfs;
    let _firstName = "John"
    let _lastName = "Doe"
    let _name = _firstName + " " + _lastName
    let _email = "johndoe@example.com"
    let address = accounts[0]
    let _bookHash = '123abcd'
    let _title = 'test book'
    let _thumbnail = '456efgh'
    IPFS.deployed().then(instance => {
      ipfs = instance;
      return ipfs.newAuthor.send(_firstName, _lastName, _email)
    }).then(() => {
      return ipfs.addBook.send(_bookHash, _title, _thumbNail)
    }).then(success  => {
      if (success) {
        return ipfs.getBooksByAuthorName.send(_name)
      }
    }).then(bookIds => {
      assert.equal(_name, bookIds[1], 'not the same author name')
      assert.equal(_email, bookIds[2], 'not the same author email')
      return ipfs.books.send(bookIds[0][0])
    }).then(book => {
      assert.equal(address, book.authorAddress, 'not the same author address')
      assert.equal(_title, book.title, 'not the same title')
      assert.equal(_bookHash, book.bookHash, 'not the same content')
      assert.equal(_thumbnail, book.thumbHash, 'not the same cover')
    })
  })
})
