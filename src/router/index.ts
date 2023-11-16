import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { App, h } from 'vue'
import {
  Battery100Icon,
  CircleStackIcon,
  HomeIcon,
  PresentationChartLineIcon,
} from '@heroicons/vue/24/solid'
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
    component: () => import('@/views/sys/login/LoginIndex.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      hideInMenu: true,
    },
    component: () => import('@/views/sys/error-page/404Page.vue'),
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
          icon: () => h(HomeIcon, { class: 'w-4 h-4' }),
        },
        component: () => import('@/views/sys/error-page/404Page.vue'),
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
          icon: () => h(PresentationChartLineIcon, { class: 'w-4 h-4' }),
        },
        component: () => import('@/views/sys/error-page/404Page.vue'),
      },
    ],
  },
  {
    path: '/data-management',
    name: 'DataManagement',
    meta: {
      title: '数据管理',
      icon: () => h(CircleStackIcon, { class: 'w-4 h-4' }),
      roles: ['admin'],
    },
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'BatterySM',
        meta: {
          title: '三免电池管理',
          icon: () => h(Battery100Icon, { class: 'w-4 h-4' }),
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
  router.replace('/')
}

export function setupRouter(app: App) {
  app.use(router)

  setupRouterGuard(router)
}
