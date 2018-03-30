<template>
  <v-content>
    <section>
        <v-layout class="parallax">
          <router-view/>
        </v-layout>
    </section>
    <features/>
    <call-to-action/>
    <hello-metamask/>
  </v-content>
</template>

<script>
import Features from '@/components/static/features'
import Cta from '@/components/static/cta'
import HelloMetamask from '@/components/helloMetamask'
export default {
  name: 'home',
  components: {
    'features': Features,
    'call-to-action': Cta,
    'hello-metamask': HelloMetamask
  },
  created () {
    this.$store.dispatch('fetchContract')
  }
}
</script>

<style scoped>
.parallax {
  /* The image used */
  background: rgb(69,72,77); /* Old browsers */
    background: -moz-radial-gradient(ellipse at center, rgba(69,72,77,.5) 0%,rgba(0,0,0,.9) 100%), url('../assets/hero.jpg') no-repeat;  /* FF3.6-15 */
    background: -webkit-radial-gradient(ellipse at center, rgba(69,72,77,.5) 0%,rgba(0,0,0,.9) 100%), url('../assets/hero.jpg') no-repeat;  /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(ellipse at center, rgba(69,72,77,.5) 0%,rgba(0,0,0,.9) 100%), url('../assets/hero.jpg') no-repeat; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

  /* Set a specific height */
  min-height: 100vh;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
