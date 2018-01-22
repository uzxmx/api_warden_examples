export const isAuthenticated = state => {
  return state.user_id && state.access_token
}
