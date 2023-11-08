import type { ItemType } from 'ant-design-vue'
import { VNode, VueElement } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export function formatMenus(routes: RouteRecordRaw[]) {
  const menuFilter = (routeList: RouteRecordRaw[]) => {
    const menus: ItemType[] = []
    routeList.forEach((route) => {
      if (route.meta?.hideInMenu) {
        return
      }

      let menuRoute = route
      if (route.children && route.children.length === 1 && !route.meta?.title) {
        menuRoute = route.children[0]
        if (menuRoute.meta?.hideInMenu) {
          return
        }
      }

      const key = menuRoute.name as string
      if (!key) {
        return
      }

      if (menuRoute.children) {
        const item = getItem(
          menuRoute.meta?.title as string,
          key,
          menuRoute.meta?.icon,
          menuFilter(menuRoute.children),
        )
        menus.push(item)
      } else {
        const item = getItem(menuRoute.meta?.title as string, key, menuRoute.meta?.icon)
        menus.push(item)
      }
    })
    return menus
  }
  return menuFilter(routes)
}

function getItem(
  label: VueElement | string,
  key: string,
  icon?: () => VNode,
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
