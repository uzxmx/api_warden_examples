<template>
  <div>
    <div v-if="isAuthenticated">
      <p><mt-button type="primary" @click="handleSignOut">Sign Out</mt-button></p>
      <p><router-link :to="{ name: 'Home' }">Home</router-link></p>
      <p><router-link :to="{ name: 'ProtectedResource' }">ProtectedResource</router-link></p>      
    </div>
    <router-view />    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import * as types from './store/mutation-types'

  export default {
    computed: mapGetters(['isAuthenticated']),

    methods: {
      handleSignOut () {
        this.$store.commit(types.REMOVE_AUTH)
        this.$router.replace({ name: 'SignIn' })
      }
    },

    created () {
      if (!this.isAuthenticated && this.$route.name !== 'SignIn' && this.$route.name !== 'ProtectedResource') {
        this.$router.replace({ name: 'SignIn' })
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    font-size: 14px;
  }
</style>
