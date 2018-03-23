let addBook = (book, thumb, title, from, contract) => {
  return new Promise(function (resolve, reject) {
  console.log(book, title, thumb)
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
      console.log(res)
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
        console.log(res)
        resolve(res)
      }
    })
  })
}

export {addBook, byTitle, byAuthor}
