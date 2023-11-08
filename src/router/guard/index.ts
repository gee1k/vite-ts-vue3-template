import { Router } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createPermissionGuard } from './permissionGuard'

export function setupRouterGuard(router: Router) {
  createProgressGuard(router)
  createPermissionGuard(router)
}

export function createProgressGuard(router: Router) {
  router.beforeEach(async () => {
    nProgress.start()
    return true
  })

  router.afterEach(async () => {
    nProgress.done()
    return true
  })
}
