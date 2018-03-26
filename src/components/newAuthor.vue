<template>
  <div id="newAuthor">
    <h3>Register as Author</h3>
    <label for="firstName">First Name</label>
    <input v-model="firstName" type="text" id="firstName" placeholder="First Name">
    <label for="lastName">Last Name</label>
    <input v-model="lastName" type="text" id="lastName" placeholder="Last Name">
    <label for="email">E-mail</label>
    <input type="email" id="email" placeholder="smith@example.com">
    <button v-on:click="register" type="button" name="button">Register</button>
    {{ registered }}
  </div>
</template>

<script>
import {newAuthor} from '../util/contractMethods'
export default {
  data () {
    return {
    firstName: null,
    lastName: null,
    email: null,
    registered: null
    }
  },
  methods: {
    register () {
      newAuthor(this.firstName, this.lastName, this.email, this.$store.state.web3.coinbase, this.$store.state.contractInstance)
        .then(r => this.registered = true).catch(e => this.registered = false)
    }
  }
}
</script>

<style>

</style>
