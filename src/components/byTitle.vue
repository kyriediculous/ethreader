<template>
  <div id="byTitle">
    <h3>Search books by title</h3>
    <input v-model='bookTitle' type="text" name="byTitle" placeholder='Enter title...'>
    <button v-on:click="search" type="button" name="button">Search</button>
    <div class="book" v-if="fetchBook.bookHash">
      <h3>{{fetchBook.title}}</h3>
      <img width="150" height="100" :src="fetchBook.thumbHash" alt="book cover">
      <p><strong>{{fetchBook.authorName}}</strong></p>
      <p>{{fetchBook.authorEmail}}</p>
    </div>
  </div>
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
       thumbHash: null
     }
   }
 },
 methods: {
   search () {
     byTitle(this.bookTitle, this.$store.state.web3.coinbase, this.$store.state.contractInstance)
      .then(r => {
        this.fetchBook.authorName = r.authorName,
        this.fetchBook.authorEmail = r.authorEmail,
        this.fetchBook.bookHash = r.bookHash
        this.fetchBook.title = r.title
        this.fetchBook.thumbHash = r.thumbnail
      }).catch(e => console.log(e))
   }
 }
}
</script>

<style>
.book {
  padding: 15px;
  border: 1px solid #f5f5f5;
  box-shadow: 0 19px 38px rgba(0,0,0,0.22), 0 15px 12px rgba(0,0,0,0.11);
  border-radius:5px;
}
</style>
