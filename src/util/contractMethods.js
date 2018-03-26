let addBook = (book, thumb, title, from, contract) => {
  return new Promise(function (resolve, reject) {
  contract().contract.addBook(book, title, thumb, {
    from: from
  },
  (err, res) => {
    if (err) {
      reject(new Error('error adding book to contract', err))
    } else {
      resolve('book added')
    }
  })
})
}

let byTitle = (title, from, contract) => {
  return new Promise(function (resolve, reject) {
    console.log(contract())
  contract().contract.getBookByTitle(title, {from: from}, (err, res) => {
    if (err) {
      reject(new Error('could not find book with title' + title))
    } else {
      resolve(res)
    }
  })
})
}

let byAuthor = (author, from, contract) => {
  return new Promise(function (resolve, reject) {
    contract().contract.getBooksByAuthor(author, {from: from}, (err, res) => {
      if (err) {
        reject(new Error('could not find books for author' + author))
      } else {
        resolve(res)
      }
    })
  })
  .then(res => {
    return new Promise(function(resolve, reject) {
      Promise.all(
        res.map( (id) => {
          return new Promise(function(resolve, reject) {
            contract().contract.books(id, (err, res) => {
              resolve({
                author: res[0],
                title: res[1],
                bookHash: res[2],
                thumbHash: res[3],
                timestamp: res[4]
              })
            })
          })
        })
      ).then(res => {resolve(res)})
    })
  })
}

let newAuthor = (firstName, lastName, email, from, contract) => {
  return new Promise(function(resolve, reject) {
    contract().contract.newAuthor(firstName, lastName, email, {from: from}, (err, res) => {
      if (err) {
        reject(new Error('could not register', e))
      } else {
        resolve(res)
      }
    })
  })
}

export {addBook, byTitle, byAuthor, newAuthor}
