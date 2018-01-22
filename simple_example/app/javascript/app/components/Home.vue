<template>
  <div>
    <p>user_id: {{ user_id }}</p>
    <p>access_token: {{ access_token }} <mt-button type="primary" @click="handleClearAccessToken">Clear Access Token</mt-button></p>
    <p>refresh_token: {{ refresh_token }} <mt-button type="primary" @click="handleClearRefreshToken">Clear Refresh Token</mt-button></p>
    <mt-button type="primary" @click="handleRefresh">Refresh token</mt-button>
  </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui'
  import { mapState } from 'vuex'

  import * as types from '../store/mutation-types'

  export default {
    computed: mapState(['user_id', 'access_token', 'refresh_token']),

    methods: {
      handleClearAccessToken () {
        var auth = {
          user_id: this.user_id,
          access_token: '',
          refresh_token: this.refresh_token
        }
        this.$store.commit(types.RECEIVE_AUTH, auth)
      },

      handleClearRefreshToken () {
        var auth = {
          user_id: this.user_id,
          access_token: this.access_token,
          refresh_token: ''
        }
        this.$store.commit(types.RECEIVE_AUTH, auth)
      },      

      handleRefresh () {
        Indicator.open('Loading...')
        this.$store.dispatch('refreshToken').then(() => {
          Toast('Refresh successfully')
        }).catch(err => {
          if (err.response.status == 403) {
            Toast(err.response.data.err_msg)
            this.$router.replace({ name: 'SignIn' })
          }
        }).finally(() => Indicator.close())
      }
    }
  }
</script>
