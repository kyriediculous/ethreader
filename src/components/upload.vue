<template>
  <div id="upload">
    <h3>Upload book (pdf)</h3>
    <form v-on:submit.prevent="submitFile">
      <input v-on:change="captureFile" type="file" placeholder="Select file..."/>
      <input v-model="title" name="title" placeholder="Enter title">
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
import ipfs from '../util/ipfs'
export default {
  name: 'upload',
  data () {
    return {
      ipfsHash: '',
      thumbHash: '',
      title: ''
    }
  },
  computed: {
    filebuffer () {
      return this.$store.state.fileBuffer
    }
  },
  methods: {
    captureFile (event) {
      let file = event.target.files[0]
      let reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {this.$store.dispatch('loadBuffer', reader)}
    },
    submitFile (event) {
      ipfs.add(this.$store.state.fileBuffer)
        .then(r => {
          let ipfsHash = r[0].hash
          this.ipfsHash = ipfsHash
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style>

</style>
