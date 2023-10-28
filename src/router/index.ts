import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { h } from 'vue'
import { HomeOutlined, DatabaseOutlined } from '@ant-design/icons-vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
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
      {
        path: 'data-management',
        name: 'DataManagement',
        meta: {
          title: '数据管理',
          icon: () => h(DatabaseOutlined),
        },
        redirect: '/data-management/battery-sm',
        children: [
          {
            path: 'battery-sm',
            name: 'BatterySM',
            meta: {
              title: '三免电池管理',
              icon: () => h(DatabaseOutlined),
            },
            component: () => import('@/views/data-management/battery-sm/BatteryIndex.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
