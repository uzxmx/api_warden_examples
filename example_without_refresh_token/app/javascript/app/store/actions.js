import axios from 'axios'

import * as types from './mutation-types'

export const signIn = ({ commit }, { username, password }) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/sign_in', { username, password }).then(resp => {
      const data = resp.data

      if (data.user_id) {
        commit(types.RECEIVE_AUTH, data)
      }

      resolve(data)
    }).catch(err => reject(err))
  })
}

export const getProtectedResource = ({ state, dispatch }) => {
  return new Promise((resolve, reject) => {
    var headers = {
      'X-User-Id': state.user_id,
      'X-User-Access-Token': state.access_token
    }
    axios.get('/api/protected_resource', { headers }).then(resp => resolve(resp)).catch(err => reject(err))
  })
}
