<template>
  <div id="byAuthor">
    <h3>Search books by Author</h3>
    <input v-model='bookAuthor' type="text" name="byAuthor" placeholder='Enter author (ether address)...'>
  </div>
</template>

<script>
export default {
  name: 'byAuthor',
  data () {
   return {
     bookAuthor: ''
   }
 }
}
</script>

<style>

</style>
