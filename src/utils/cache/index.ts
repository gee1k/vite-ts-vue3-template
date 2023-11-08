import { getCommonStoragePrefix } from '../env'
import { createStorage as create, CreateStorageParams } from './storageCache'
import { createCookieStorage as createCookie, CreateCookieStorageParams } from './cookieCache'

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

export type StorageOptions = Partial<CreateStorageParams>

export type CookieStorageOptions = Partial<CreateCookieStorageParams>

const createOptions = (storage: Storage, options: StorageOptions = {}): StorageOptions => {
  return {
    storage,
    prefixKey: getCommonStoragePrefix(),
    ...options,
  }
}

export const WebStorage = create(createOptions(sessionStorage))

export const createStorage = (storage: Storage = sessionStorage, options: StorageOptions = {}) => {
  return create(createOptions(storage, options))
}

export const createSessionStorage = (options: StorageOptions = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createLocalStorage = (options: StorageOptions = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createCookieStorage = (options: CookieStorageOptions = {}) => {
  return createCookie({
    prefixKey: getCommonStoragePrefix(),
    ...options,
    timeout: DEFAULT_CACHE_TIME,
  })
}

export const WebCookieStorage = createCookieStorage()

export default WebStorage
