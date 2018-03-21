<template>
  <div id="home">
    <by-title/>
    <by-author/>
    <upload/>
  </div>
</template>

<script>
import ByTitle from '@/components/byTitle'
import ByAuthor from '@/components/byAuthor'
import Upload from '@/components/upload'

export default {
  name: 'home',
  components: {
    'by-title': ByTitle,
    'by-author': ByAuthor,
    'upload': Upload
  },
  created () {
    this.$store.dispatch('fetchContract')
  }
}
</script>

<style>

</style>
