<template>
<v-layout column align-center justify-center>
  <img src="@/assets/logo.png" alt="logo" height="200">
 <h1>EthReader</h1>
 <h3>Decentralized E-book platform built on Ethereum and IPFS</h3>
 <v-btn round dark href="#features" color="primary-gradient" class="px-3 my-5" @click="$vuetify.goTo('#features')">Features</v-btn>
</v-layout>

</template>

<script>

</script>

<style scoped>

h1 {
  font-size: 50px;
  margin-top: 0;
  color: white;
}

@media (min-width: 768px) {
   h1 {
    font-size: 80px;
  }
}

h3 {
  color:white;
}

@media (max-width:1024px) {
  h3 {
    text-align:center !important;
  }
}
</style>
