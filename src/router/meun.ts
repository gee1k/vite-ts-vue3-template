import { RouteRecordRaw } from 'vue-router'
import { routes } from '.'
import type { ItemType } from 'ant-design-vue'
import { VueElement } from 'vue'

export function getMenuRoute() {
  return routes.find((item) => item.path === '/')
}

export function getMenus() {
  const rootRoute = getMenuRoute()
  if (!rootRoute || !rootRoute.children) return []

  const menuFilter = (parentRoute: RouteRecordRaw) => {
    if (!parentRoute.children) {
      return []
    }
    const menus: ItemType[] = []
    parentRoute.children.forEach((route) => {
      if (route.meta?.hideInMenu) {
        return
      }

      if (route.children) {
        const item = getItem(
          route.meta?.title as string,
          route.path || '/',
          route.meta?.icon,
          menuFilter(route),
        )
        menus.push(item)
      } else {
        const item = getItem(route.meta?.title as string, route.path || '/', route.meta?.icon)
        menus.push(item)
      }
    })
    return menus
  }
  return menuFilter(rootRoute)
}

function getItem(
  label: VueElement | string,
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}
