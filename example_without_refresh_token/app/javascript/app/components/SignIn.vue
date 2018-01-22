<template>
  <div>
    <div><router-link :to="{ name: 'ProtectedResource' }">Try access protected resource</router-link></div>
    <h1>Sign in</h1>
    <div>The default username is 'foo'. (not include the quotes)</div>
    <div>The default password is '123456'. (not include the quotes)</div>
    <mt-field placeholder="Username" v-model="username"></mt-field>
    <mt-field type="password" placeholder="Password" v-model="password"></mt-field>
    <mt-button type="primary" @click="handleSignIn">Sign In</mt-button>
  </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui'

  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },

    methods: {
      handleSignIn () {
        if (this.username === '') {
          Toast('Please input the username')
          return
        }
        if (this.password === '') {
          Toast('Please input the password')
          return
        }

        Indicator.open()
        this.$store.dispatch('signIn', {
          username: this.username,
          password: this.password
        }).then(data => {
          if (data.err_msg) {
            Toast(data.err_msg)
          } else if (data.user_id) {
            this.$router.replace({ name: 'ProtectedResource' })
          }
        }).catch(err => {
          Toast(err.response)
        }).finally(() => Indicator.close())
      }
    },

    created () {
      if (this.$store.getters.isAuthenticated) {
        this.$router.replace({ name: 'Home' })
      }
    }
  }
</script>
