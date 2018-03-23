<template>
  <div id="upload">
    <h3>Upload book</h3>
    <form v-on:submit.prevent="submitFile">
      <label for="book">Choose pdf file to upload</label>
      <input id="fileBuffer" v-on:change="captureFile" type="file"/><br />
      <label for="thumbnail">Choose cover</label>
      <input id="thumbBuffer" v-on:change="captureFile" type="file" accept="image/*"><br />
      <button type="submit">Upload</button><br />
      <label for="">Title</label>
      <input id="title" v-model="title" name="title" placeholder="Enter title">
      <p>
        {{bookHash}}
        {{thumbHash}}
      </p>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ipfs from '../util/ipfs'
import {addBook} from '../util/contractMethods'
export default {
  name: 'upload',
  data () {
    return {
      fileBuffer: null,
      thumbBuffer: null,
      bookHash: null,
      thumbHash: null,
      title: null
    }
  },
  computed: mapState({
    coinbase: state => state.web3.coinbase
  }),
  methods: {
    captureFile (event) {
      let reader = new window.FileReader()
      reader.readAsArrayBuffer(event.target.files[0])
      reader.onloadend = () => {
        this[event.srcElement.id] = Buffer.from(reader.result)
      }
    },
    submitFile (event) {
      ipfs.add(this.fileBuffer)
        .then(r => {
          let ipfsHash = r[0].hash
          this.bookHash = ipfsHash
          return ipfs.add(this.thumbBuffer)
        }).then(r => {
          let ipfsHash = r[0].hash
          this.thumbHash = ipfsHash
          return addBook(this.bookHash, this.thumbHash, this.title, this.coinbase, this.$store.state.contractInstance)
        })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>
</style>
