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
    contract().contract.getBookByTitle(title, {from: from}, (err, res) => {
      if (err) {
        reject(new Error('could not find book with title' + title))
      } else {
        resolve(res)
      }
    })
  }).then(res => {
    let bookHash = res[1]
    let title = res[2]
    let thumbnail = 'https://gateway.ipfs.io/ipfs/' + res[3]
    return new Promise(function(resolve, reject) {
      contract().contract.authors(res[0], (err, res) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve({
            bookHash,
            title,
            thumbnail,
            authorName: res[2],
            authorEmail: res[3]
          })
        }
      })
    })
  })
}

let byAuthor = (author, from, contract) => {
  return new Promise(function (resolve, reject) {
    contract().contract.getBooksByAuthorName(author, {from: from}, (err, res) => {
      if (err) {
        reject(new Error('could not find books for author' + author))
      } else {
        resolve(res)
      }
    })
  })
  .then(res => {
    let authorName = res[1];
    let authorEmail = res[2]
    return new Promise(function(resolve, reject) {
      Promise.all(
        res[0].map( (id) => {
          return new Promise(function(resolve, reject) {
            contract().contract.books(id, (err, res) => {
              resolve({
                authorName,
                authorEmail,
                title: res[1],
                bookHash: res[2],
                thumbHash: 'https://gateway.ipfs.io/ipfs/' + res[3],
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
