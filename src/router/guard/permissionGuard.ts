import type { Router, RouteRecordRaw } from 'vue-router'

import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useUserStoreWithOut } from '@/store/modules/user'

const LOGIN_PATH = '/login'

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, _, next) => {
    const hasToken = !!userStore.token

    if (hasToken) {
      if (to.path === LOGIN_PATH) {
        // If is logged in, redirect to the home page
        next((to.query?.redirect as string) || '/')
        return
      }

      const hasRoles = userStore.roleList?.length > 0
      if (hasRoles) {
        next()
        return
      }

      try {
        // If there is no permission user info, request the user information again
        const { roles } = await userStore.getUserInfo()
        const accessRoutes = await permissionStore.generateRoutes(roles)
        accessRoutes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw)
        })
        next({ ...to, replace: true })
      } catch (e) {
        await userStore.resetState()
        next(`${LOGIN_PATH}?redirect=${to.path}`)
      }
    } else {
      if (!to.meta.roles || !to.meta.roles.length) {
        next()
        return
      }
      next(`${LOGIN_PATH}?redirect=${to.path}`)
    }
  })
}
