<template>
  <div>
    <p>user_id: {{ user_id }}</p>
    <p>access_token: {{ access_token }} <mt-button type="primary" @click="handleClearAccessToken">Clear Access Token</mt-button></p>
  </div>
</template>

<script>
  import { Toast, Indicator } from 'mint-ui'
  import { mapState } from 'vuex'

  import * as types from '../store/mutation-types'

  export default {
    computed: mapState(['user_id', 'access_token']),

    methods: {
      handleClearAccessToken () {
        var auth = {
          user_id: this.user_id,
          access_token: ''
        }
        this.$store.commit(types.RECEIVE_AUTH, auth)
      }
    }
  }
</script>
