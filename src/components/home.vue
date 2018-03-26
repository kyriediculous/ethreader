<template>
  <div id="home">
    <new-author/>
    <by-title/>
    <by-author/>
    <upload/>
    <hello-metamask/>
  </div>
</template>

<script>
import NewAuthor from '@/components/newAuthor'
import ByTitle from '@/components/byTitle'
import ByAuthor from '@/components/byAuthor'
import Upload from '@/components/upload'
import HelloMetamask from '@/components/helloMetamask'
export default {
  name: 'home',
  components: {
    'new-author': NewAuthor,
    'by-title': ByTitle,
    'by-author': ByAuthor,
    'upload': Upload,
    'hello-metamask': HelloMetamask
  },
  created () {
    this.$store.dispatch('fetchContract')
  }
}
</script>

<style>

</style>
