import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { App, h } from 'vue'
import { HomeOutlined, DatabaseOutlined } from '@ant-design/icons-vue'
import { setupRouterGuard } from './guard'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hideInMenu: true,
    },
    component: () => import('@/views/login/LoginIndex.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      hideInMenu: true,
    },
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    meta: {
      hideInMenu: true,
    },
    redirect: '/404',
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: MainLayout,
    meta: {
      roles: ['admin'],
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: () => h(HomeOutlined),
        },
        component: () => import('@/views/error-page/404.vue'),
      },
    ],
  },
  {
    path: '/analysis',
    component: MainLayout,
    meta: {
      roles: ['admin'],
    },
    children: [
      {
        path: '',
        name: 'Analysis',
        meta: {
          title: '分析',
          icon: () => h(HomeOutlined),
        },
        component: () => import('@/views/error-page/404.vue'),
      },
    ],
  },
  {
    path: '/data-management',
    name: 'DataManagement',
    meta: {
      title: '数据管理',
      icon: () => h(DatabaseOutlined),
      roles: ['admin'],
    },
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'BatterySM',
        meta: {
          title: '三免电池管理',
          icon: () => h(DatabaseOutlined),
        },
        component: () => import('@/views/data-management/battery-sm/BatteryIndex.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...asyncRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name, meta } = route
    if (name && (meta.roles?.length || 0) > 0) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App) {
  app.use(router)

  setupRouterGuard(router)
}
