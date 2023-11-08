import Cookies from 'js-cookie'
import { isNullOrUnDef } from '../is'

export interface CreateCookieStorageParams {
  prefixKey: string
  timeout?: Nullable<number>
}

export const createCookieStorage = ({
  prefixKey = '',
  timeout = null,
}: Partial<CreateCookieStorageParams> = {}) => {
  const WebCookieStorage = class WebCookieStorage {
    private prefixKey?: string

    constructor() {
      this.prefixKey = prefixKey
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     * Set cache
     * @param {string} key
     * @param {*} value
     * @param {*} expire Expiration time in seconds
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      })

      const expireDate = expire ? new Date(new Date().getTime() + expire * 1000) : undefined
      Cookies.set(this.getKey(key), stringData, { expires: expireDate })
    }

    /**
     * Read cache
     * @param {string} key
     * @param {*} def
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = Cookies.get(this.getKey(key))
      if (!val) return def

      try {
        const data = JSON.parse(val)
        const { value, expire } = data
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (e) {
        return def
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      Cookies.remove(this.getKey(key))
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      const dic = Cookies.get()
      Object.keys(dic).forEach((key) => {
        if (isNullOrUnDef(this.prefixKey) || key.startsWith(this.prefixKey)) {
          Cookies.remove(key)
        }
      })
    }
  }
  return new WebCookieStorage()
}
