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

export const refreshToken = ({ state, commit }) => {
  return new Promise((resolve, reject) => {
    var headers = {
      'X-User-Id': state.user_id,
      'X-User-Refresh-Token': state.refresh_token
    }
    axios.post('/api/refresh_token', {}, { headers }).then(resp => {
      const data = resp.data

      if (data.user_id) {
        commit(types.RECEIVE_AUTH, data)
      }

      resolve(data)
    }).catch(err => {
      if (err.response.status == 403) {
        commit(types.REMOVE_AUTH) 
      }
      reject(err)
    })
  })
}

export const getProtectedResource = ({ state, dispatch }) => {
  return new Promise((resolve, reject) => {
    var headers = {
      'X-User-Id': state.user_id,
      'X-User-Access-Token': state.access_token
    }
    axios.get('/api/protected_resource', { headers }).then(resp => resolve(resp)).catch(err => {
      if (err.response.status === 401 && state.refresh_token) {
        dispatch('refreshToken').then(() => {
          dispatch('getProtectedResource').then(resp => resolve(resp)).catch(err => reject(err))
        }).catch(err => reject(err))
      } else {
        reject(err)
      }
    })
  })
}
