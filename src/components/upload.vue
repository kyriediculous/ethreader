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
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click.prevent="submitFile" dark color="primary-gradient">Upload</v-btn>
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
      title: null
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
      console.log(this.thumbBuffer)
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
