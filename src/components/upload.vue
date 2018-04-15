<template>
  <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary-gradient">
                <v-toolbar-title>Upload New Book</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field color="black" v-model="fileName" prepend-icon="attach_file" label="Book (pdf)" @click="pickFile"></v-text-field>
                  <input id="fileBuffer" required type="file" style="display: none" ref="bookFile" @change="captureFile">
                  <v-text-field color="black" v-model="thumbName" prepend-icon="add_a_photo" label="Book cover (png, jpg, gif)" @click="pickThumb"></v-text-field>
                  <input id="thumbBuffer" required type="file" accept="image/*" style="display: none" ref="thumbFile" @change="captureFile">
                  <v-text-field required color="black" v-model="title" prepend-icon="create" label="Title"></v-text-field>
                </v-form>
                <v-alert type="success" :value="success">Upload succesful.</v-alert>
                <v-alert type="error" :value="error">Upload failed: <span>{{error}}</span></v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-progress-circular v-if="inProgress" indeterminate color="purple"></v-progress-circular>
                <v-btn v-if="inProgress === false" v-on:click.prevent="submitFile" dark color="primary-gradient">Upload</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
      fileName: null,
      thumbBuffer: null,
      thumbName: null,
      bookHash: null,
      thumbHash: null,
      title: null,
      inProgress: false,
      success: false,
      error: false
    }
  },
  computed: mapState({
    coinbase: state => state.web3.coinbase
  }),
  methods: {
    pickFile() {
      return this.$refs.bookFile.click()
    },
    pickThumb() {
      return this.$refs.thumbFile.click()
    },
    captureFile (event) {
      if (event.target.id == 'fileBuffer') {
        this.fileName = event.target.files[0].name
      } else if (event.target.id == 'thumbBuffer') {
        this.thumbName = event.target.files[0].name
      }
      let reader = new window.FileReader()
      reader.readAsArrayBuffer(event.target.files[0])
      reader.onloadend = () => {
        this[event.target.id] = Buffer.from(reader.result)
      }
    },
    submitFile (event) {
      this.inProgress=true
      ipfs.add(this.fileBuffer)
        .then(r => {
          let ipfsHash = r[0].hash
          this.bookHash = ipfsHash
          return ipfs.add(this.thumbBuffer)
        }).then(r => {
          let ipfsHash = r[0].hash
          this.thumbHash = ipfsHash
          console.log(this.bookHash, this.thumbHash, this.title)
          return addBook(this.bookHash, this.thumbHash, this.title, this.coinbase, this.$store.state.contractInstance)
        })
        .then(r => {
          this.inProgress = false
          if (r == "0x00") {
            this.error = "Content already exists on the network."
          } else if (r == "0x01") {
            this.success = true
          }
        }).catch(e => {
          this.error = e.message
          this.inProgress = false
        })
    }
  }
}
</script>

<style>
</style>
