<template>
  <div id="byTitle">
    <h3>Search books by title</h3>
    <input v-model='bookTitle' type="text" name="byTitle" placeholder='Enter title...'>
    <button v-on:click="search" type="button" name="button">Search</button>
    <div v-if="fetchBook.bookHash">
      {{fetchBook.title}}
      {{fetchBook.author}}
      {{fetchBook.bookHash}}
      {{fetchBook.thumbHash}}
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
       author: null,
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
        this.fetchBook.author = r[0]
        this.fetchBook.bookHash = r[1]
        this.fetchBook.title = r[2]
        this.fetchBook.thumbHash = r[3]
      }).catch(e => console.log(e))
   }
 }
}
</script>

<style>

</style>
