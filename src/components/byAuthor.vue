<template>
  <v-container d-block fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary-gradient">
            <v-toolbar-title>Search By Author</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field color="black" v-model="bookAuthor" prepend-icon="search" label="Author" type="text"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-on:click="search" dark color="primary-gradient">Search</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="fetchBooks" row align-center justify-center>
      <v-alert :value="fetchBooks.length == 0" type="info">No results found...</v-alert>
      <v-flex v-if="fetchBooks.length > 0" class="my-2" xs12 sm8 md6>
        <v-card>
          <v-container fluid style="min-height: 0; max-height:40vh; overflow:auto;" grid-list-lg>
            <v-layout row wrap>
              <template v-for="book in fetchBooks">
                <v-flex xs12>
                  <v-card light hover>
                    <v-container fluid grid-list-lg>
                      <v-layout row>
                        <v-flex xs7>
                          <div>
                            <div class="headline">{{book.title}}</div>
                            <div>{{book.authorName}}</div>
                            <div>{{book.authorEmail}}</div>
                            <div>{{book.IPPR}}</div>
                            <div>{{book.timestamp}}</div>
                          </div>
                        </v-flex>
                        <v-flex xs5>
                          <v-card-media :src="book.thumbHash" height="125px" contain></v-card-media>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {byAuthor} from '../util/contractMethods'
export default {
  name: 'byAuthor',
  data () {
   return {
     bookAuthor: '',
     fetchBooks: null
   }
 },
 methods: {
   search () {
     byAuthor(this.bookAuthor, this.$store.state.web3.coinbase, this.$store.state.contractInstance).then(r => this.fetchBooks = r).catch(e => console.log(e))
   }
 }
}
</script>

<style>
.book-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
}
.book {
  text-align:center;
  padding: 15px;
  border: 1px solid #f5f5f5;
  box-shadow: 0 19px 38px rgba(0,0,0,0.22), 0 15px 12px rgba(0,0,0,0.11);
  border-radius:5px;
}
</style>
