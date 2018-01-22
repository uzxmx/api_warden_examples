<template>
  <div>
    <div>{{ resp }}</div>
    <div v-if="!isAuthenticated"><router-link :to="{ name: 'SignIn' }">Go to Sign In</router-link></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Indicator } from 'mint-ui'

  export default {
    data () {
      return {
        resp: ''
      }
    },

    computed: {
      ...mapGetters(['isAuthenticated'])
    },

    created () {
      Indicator.open('Loading...')
      this.$store.dispatch('getProtectedResource').then(resp => {
        this.resp = resp.data
      }).catch(err => {
        this.resp = err.response.data
      }).finally(() => Indicator.close())
    }
  }
</script>
