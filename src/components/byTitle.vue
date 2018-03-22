<template>
  <div id="byTitle">
    <h3>Search books by title</h3>
    <input v-model='bookTitle' type="text" name="byTitle" placeholder='Enter title...'>
    <button v-on:click="search" type="button" name="button">Search</button>
  </div>
</template>

<script>
import {byTitle} from '../util/contractMethods'
export default {
  name: 'byTitle',
  data () {
   return {
     bookTitle: ''
   }
 },
 methods: {
   search () {
     console.log(this.$store.state.web3.coinbase)
     byTitle(this.bookTitle, this.$store.state.web3.coinbase, this.$store.state.contractInstance).then(r => console.log(r)).catch(e => console.log(e))
   }
 }
}
</script>

<style>

</style>
