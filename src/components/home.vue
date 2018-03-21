<template>
  <div id="home">
    <h3>Upload Book (pdf)</h3>
    <form v-on:submit.prevent="submitFile">
      <input v-on:change="captureFile" type="file" placeholder="Select file..." />
      <button type="submit">Upload</button>
    </form>
<p>
  {{ ipfsHash }}
</p>
  </div>
</template>

<script>
import ipfs from '../util/ipfs'
export default {
  name: 'home',
  data () {
    return {
      ipfsHash: ''
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
