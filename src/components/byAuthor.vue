<template>
  <div id="byAuthor">
    <h3>Search books by Author</h3>
    <input v-model='bookAuthor' type="text" name="byAuthor" placeholder='Enter author (ether address)...'>
    <button v-on:click="search" type="button" name="button">Search</button>
    <div>
      <ul v-for="book in fetchBooks">
        <li>
          {{ book }}
        </li>
      </ul>
    </div>
  </div>
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

</style>
