import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { store } from '@/store'
import { localeSetting } from '@/settings/localeSetting'
import type { LocaleSetting } from '#/config'
import { createLocalStorage } from '@/utils/cache'

const LOCALE_KEY = 'LOCAL_SETTING'

const ls = createLocalStorage()

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

export const useLocaleStore = defineStore('app-locale', () => {
  const localeInfo = ref<LocaleSetting>(lsLocaleSetting)

  function setLocaleInfo(info: Partial<LocaleSetting>) {
    localeInfo.value = { ...localeInfo.value, ...info }
    ls.set(LOCALE_KEY, localeInfo.value)
  }

  const getLocale = computed(() => {
    return localeInfo.value.locale ?? 'zh_CN'
  })

  const getShowPicker = computed(() => {
    return localeInfo.value.showPicker
  })

  return { setLocaleInfo, getLocale, getShowPicker }
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
