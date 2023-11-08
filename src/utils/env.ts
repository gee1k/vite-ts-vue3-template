export function getCommonStoragePrefix() {
  const { VITE_APP_STORAGE_PREFIX } = getAppEnvConfig()
  return `${VITE_APP_STORAGE_PREFIX.replace(/\s/g, '_')}__${getEnv()}__`.toUpperCase()
}

export function getAppEnvConfig() {
  return import.meta.env
}

export function getEnv(): string {
  return import.meta.env.MODE
}
