<template>
  <div id="byAuthor">
    <div>
      <h3>Search books by Author</h3>
      <input v-model='bookAuthor' type="text" name="byAuthor" placeholder='Enter author (full name)'>
      <button v-on:click="search" type="button" name="button">Search</button>
    </div>
      <div class="book-grid" v-for="book in fetchBooks">
        <div class="book">
          <h3>{{book.title}}</h3>
          <img width="150" height="100" :src="book.thumbHash" alt="book cover">
          <p><strong>{{book.authorName}}</strong></p>
          <p>{{book.authorEmail}}</p>
        </div>
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
.book-grid {
  display:grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap:20px;
  align-items:center !important;
}
.book-grid .book {
  position: relative;
  padding: 15px;
  border: 1px solid #f5f5f5;
  box-shadow: 0 19px 38px rgba(0,0,0,0.22), 0 15px 12px rgba(0,0,0,0.11);
  border-radius:5px;
}
</style>
