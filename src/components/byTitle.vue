<template>
  <div id="byTitle">
    <h3>Search books by title</h3>
    <input v-model='bookTitle' type="text" name="byTitle" placeholder='Enter title...'>
  </div>
</template>

<script>
export default {
  name: 'byTitle',
  data () {
   return {
     bookTitle: ''
   }
 }
}
</script>

<style>

</style>
