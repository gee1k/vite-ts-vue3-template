import pkg from '../../package.json'

export function getCommonStoragePrefix() {
  const storagePrefix = pkg.name || 'dashboard'
  return `${storagePrefix.replace(/\s/g, '_')}__${getEnv()}__`.toUpperCase()
}

export function getAppEnvConfig() {
  return import.meta.env
}

export function getEnv(): string {
  return import.meta.env.MODE
}
