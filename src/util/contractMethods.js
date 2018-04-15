import Web3 from 'web3'
let web3 = new Web3(window.web3.currentProvider)

let addBook = (book, thumb, title, from, contract) => {
  return new Promise(function (resolve, reject) {
  contract().contract.addBook(book, title, thumb, {
    from: from
  },
  (err, res) => {
    if (err) {
      console.log(err)
      reject(new Error('Could not add book to contract'))
    } else {
      console.log(res)
      resolve(res)
    }
  })
}).then(txHash => new Promise(function(resolve, reject) {
  web3.eth.getTransactionReceipt(txHash, (err, res) => {
      resolve(res.status)
    })
  }))
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
    let title = res[1]
    let bookHash = res[2]
    let thumbnail = 'https://gateway.ipfs.io/ipfs/' + res[3]
    let timestamp = res[4]
    let IPPR = res[5]
    return new Promise(function(resolve, reject) {
      contract().contract.authors(res[0], (err, res) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve({
            bookHash,
            title,
            thumbnail,
            timestamp,
            IPPR,
            authorName: res[0],
            authorEmail: res[1]
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
                timestamp: new Date(parseInt(res[4]+'000', 10)),
                IPPR: res[5]
              })
            })
          })
        })
      ).then(res => {resolve(res)})
    })
  })
}

let newAuthor = (firstName, lastName, email, from, contract) => {
  let name = firstName + " " + lastName
  return new Promise(function(resolve, reject) {
    contract().contract.newAuthor(name, email, {from: from}, (err, res) => {
      if (err) {
        console.log(err)
        reject(new Error('could not register', err))
      } else {
        resolve(res)
      }
    })
  }).then(txHash => new Promise(function(resolve, reject) {
    web3.eth.getTransactionReceipt(txHash, (err, res) => {
        resolve(res.status)
    })
  }))
}

export {addBook, byTitle, byAuthor, newAuthor}
