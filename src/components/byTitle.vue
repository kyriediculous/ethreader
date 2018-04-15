<template>
  <v-container d-block fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary-gradient">
            <v-toolbar-title>Search By Title</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field color="black" v-model="bookTitle" prepend-icon="search" label="Title" type="text"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-on:click="search" dark color="primary-gradient">Search</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="my-2" align-center justify-center>
      <v-alert :value="fetchBook.bookHash == false" type="info">No results found...</v-alert>
      <v-flex v-if="fetchBook.bookHash" xs12 sm8 md6>
        <v-card light hover>
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs7>
                <div>
                  <div class="headline">{{fetchBook.title}}</div>
                  <div>{{fetchBook.authorName}}</div>
                  <div>{{fetchBook.authorEmail}}</div>
                  <div>{{fetchBook.IPPR}}</div>
                  <div>{{fetchBook.timestamp}}</div>
                </div>
              </v-flex>
              <v-flex xs5>
                <v-card-media :src="fetchBook.thumbHash" height="125px" contain></v-card-media>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {byTitle} from '../util/contractMethods'
export default {
  name: 'byTitle',
  data () {
   return {
     bookTitle: '',
     fetchBook: {
       authorName: null,
       authorEmail: null,
       bookHash: null,
       title: null,
       thumbHash: null,
       timestamp: null,
       IPPR: null
     }
   }
 },
 methods: {
   search () {
     byTitle(this.bookTitle, this.$store.state.web3.coinbase, this.$store.state.contractInstance)
      .then(r => {
        console.log(r.bookhash)
        this.fetchBook.authorName = r.authorName,
        this.fetchBook.authorEmail = r.authorEmail,
        this.fetchBook.bookHash = r.bookHash
        this.fetchBook.title = r.title
        this.fetchBook.thumbHash = r.thumbnail
        this.fetchBook.timestamp = new Date(parseInt(r.timestamp+'000', 10)),
        this.fetchBook.IPPR = r.IPPR
      }).catch(e => console.log(e))
   }
 }
}
</script>

<style>

</style>
