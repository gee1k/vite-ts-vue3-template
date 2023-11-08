import { UserInfo } from '#/store'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { store } from '..'
import { login as loginApi, getUserInfo as getUserInfoApi } from '@/api/user'
import type { LoginParams } from '@/api/model/user.model'
import { resetRouter } from '@/router'
import { getTokenCache, removeTokenCache, setTokenCache } from '@/utils/auth'

export const useUserStore = defineStore('app-user', () => {
  const userInfo = ref<Nullable<UserInfo>>(null)
  const token = ref<string | undefined>(getTokenCache())
  const roleList = computed(() => userInfo.value?.roles ?? [])

  function setToken(_token: string) {
    token.value = _token
    setTokenCache(_token)
  }

  function setUserInfo(_userInfo: UserInfo) {
    userInfo.value = _userInfo
  }

  function resetState() {
    userInfo.value = null
    token.value = undefined
    removeTokenCache()
  }

  async function login(params: LoginParams) {
    const data = await loginApi(params)
    const { token } = data
    setToken(token)
    return token
  }

  async function getUserInfo() {
    if (!token.value) {
      throw Error('Token is undefined')
    }
    const data = await getUserInfoApi()
    setUserInfo(data)
    return data
  }

  function logout() {
    // TODO: logout api
    resetState()
    resetRouter()
  }

  return {
    userInfo,
    token,
    roleList,
    setToken,
    setUserInfo,
    resetState,
    login,
    getUserInfo,
    logout,
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
