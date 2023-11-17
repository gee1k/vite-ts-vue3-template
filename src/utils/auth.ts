import { WebCookieStorage, WebStorage } from './cache'

const TokenKey = 'Svend-Admin-Token'

export function getTokenCache() {
  return WebStorage.get(TokenKey) || WebCookieStorage.get(TokenKey)
}

export function setTokenCache(token: string, rememberMe?: boolean, expires?: number | undefined) {
  if (!rememberMe) {
    return WebStorage.set(TokenKey, token)
  }
  return WebCookieStorage.set(TokenKey, token, expires)
}

export function removeTokenCache() {
  WebStorage.remove(TokenKey)
  return WebCookieStorage.remove(TokenKey)
}
