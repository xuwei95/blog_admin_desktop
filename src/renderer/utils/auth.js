import Cookies from 'js-cookie'
import store from '../store'
const TokenKey = 'jwt-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function get_store_Token() {
  return store.getters.token
}
