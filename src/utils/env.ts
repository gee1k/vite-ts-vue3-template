import pkg from '../../package.json'

export function getCommonStoragePrefix() {
  const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
  return `${VITE_APP_TITLE.replace(/\s/g, '_')}__${getEnv()}`.toUpperCase()
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

export function getEnv(): string {
  return import.meta.env.MODE
}
