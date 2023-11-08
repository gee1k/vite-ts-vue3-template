import { WebCookieStorage } from './cache'

const TokenKey = 'Svend-Admin-Token'

export function getTokenCache() {
  return WebCookieStorage.get(TokenKey)
}

export function setTokenCache(token: string, expires?: number | undefined) {
  return WebCookieStorage.set(TokenKey, token, expires)
}

export function removeTokenCache() {
  return WebCookieStorage.remove(TokenKey)
}
