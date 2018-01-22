import * as types from './mutation-types'

export const state = {}

function loadAuth () {
  ['user_id', 'access_token', 'refresh_token'].forEach(key => {
    state[key] = localStorage.getItem(key)
  })
}

function saveAuth (auth) {
  ['user_id', 'access_token', 'refresh_token'].forEach(key => {
    localStorage.setItem(key, auth[key])
  })
}

function removeAuth () {
  ['user_id', 'access_token', 'refresh_token'].forEach(key => {
    localStorage.removeItem(key, null)
  })
}

loadAuth()

export const mutations = {
  [types.RECEIVE_AUTH] (state, auth) {
    saveAuth(auth)
    loadAuth()
  },
  [types.REMOVE_AUTH] (state) {
    removeAuth()
    loadAuth()
  }
}
