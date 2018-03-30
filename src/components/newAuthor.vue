<template>
  <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary-gradient">
                <v-toolbar-title>Register As Author</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field required color="black" v-model="firstName" prepend-icon="account_box" label="First Name" type="text"></v-text-field>
                  <v-text-field required color="black" v-model="lastName" prepend-icon="account_box" label="Last Name" type="text"></v-text-field>
                  <v-text-field required color="black" v-model="email" prepend-icon="email" label="E-mail" type="email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="register" dark color="primary-gradient">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
        .then(r => this.registered = true).catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style>

</style>
