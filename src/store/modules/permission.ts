import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { store } from '..'
import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta?.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('app-permission', () => {
  const addRoutes = ref<RouteRecordRaw[]>([])
  const routes = computed(() => constantRoutes.concat(addRoutes.value))

  async function generateRoutes(roles: string[]) {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    addRoutes.value = accessedRoutes
    return accessedRoutes
  }

  return {
    routes,
    addRoutes,
    generateRoutes,
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
