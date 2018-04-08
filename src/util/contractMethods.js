import {store} from '@/store/index'
const web3Instance = store.state.web3.web3Instance
const convertHex = (input) => web3Instance().toAscii(input).replace(/\u0000/g, '')

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
    contract().contract.getBookByTitle(title, (err, res) => {
      if (err) {
        reject(new Error('could not find book with title' + title))
      } else {
        console.log(res)
        resolve(res)
      }
    })
  }).then(res => {
    console.log(convertHex(res[0]), convertHex(res[1]))
    let bookHash = convertHex(res[0])
    let thumbnail = 'https://gateway.ipfs.io/ipfs/' + convertHex(res[1])
    let title = convertHex(res[2])
    let author = res[3]
    let IPPR = res[4]
    return new Promise(function(resolve, reject) {
      contract().contract.authorByAddress(res[3], (err, res) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve({
            bookHash,
            title,
            thumbnail,
            authorName: convertHex(res[0]),
            authorEmail: convertHex(res[1])
          })
        }
      })
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
  .then(res => {
    let authorName = convertHex(res[1])
    let authorEmail = convertHex(res[2])
    return new Promise(function(resolve, reject) {
      Promise.all(
        res[0].map( (id) => {
          return new Promise(function(resolve, reject) {
            contract().contract.getBookById(id, (err, res) => {
              resolve({
                authorName,
                authorEmail,
                title: convertHex(res[1]),
                bookHash: convertHex(res[2]),
                thumbHash: 'https://gateway.ipfs.io/ipfs/' + convertHex(res[3]),
                IPPR: res[4]
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
        reject(new Error('could not register', e))
      } else {
        resolve(res)
      }
    })
  })
}

export {addBook, byTitle, byAuthor, newAuthor}
