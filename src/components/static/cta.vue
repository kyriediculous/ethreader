<template>
  <section>
      <v-layout column align-center justify-center class="parallax">
        <h1 class="white--text">Read. <br /> Write. <br />Publish.</h1>
      </v-layout>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.parallax {
    /* The image used */
    background: rgb(103,0,199); /* Old browsers */
  background: -moz-linear-gradient(left, rgba(103,0,199,0.5) 0%, rgba(170,4,185,0.5) 100%), url('../../assets/bg-cta.jpg'); /* FF3.6-15 */
  background: -webkit-linear-gradient(left, rgba(103,0,199,0.5) 0%,rgba(170,4,185,0.5) 100%), url('../../assets/bg-cta.jpg'); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right, rgba(103,0,199,0.5) 0%,rgba(170,4,185,0.5) 100%), url('../../assets/bg-cta.jpg'); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

    /* Set a specific height */
    min-height: 400px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

h1 {
  font-size: 50px;
  max-width: 450px;
  margin-top: 0;
  margin-bottom: 25px;
  color: white;
}

@media (min-width: 768px) {
   h1 {
    font-size: 80px;
  }
}
</style>
