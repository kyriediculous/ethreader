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
                <v-alert type="success" :value="success">Registration succesful.</v-alert>
                <v-alert type="error" :value="error">{{error}}</v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-progress-circular v-if="inProgress" indeterminate color="purple"></v-progress-circular>
                <v-btn v-if="inProgress === false" v-on:click="register" dark color="primary-gradient">Register</v-btn>
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
    registered: null,
    inProgress: false,
    success: false,
    error: false
    }
  },
  methods: {
    register () {
      this.inProgress = true
      this.success = false
      this.error = false
      newAuthor(this.firstName, this.lastName, this.email, this.$store.state.web3.coinbase, this.$store.state.contractInstance)
        .then(r => {
          this.inProgress = false
          if (r == "0x00") {
            this.error = "Registration failed (Author already exists by name or address)."
          } else if (r == "0x01") {
            this.success = true
          }
        }).catch(e => {
            this.inProgress = false
            this.error = "Transaction failed, please try increasing gas amount."
        })
    }
  }
}
</script>

<style>

</style>
