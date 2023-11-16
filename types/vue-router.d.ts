import 'vue-router'
import { VNode } from 'vue'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: () => VNode
    hideInMenu?: boolean
    roles?: string[]
  }
}
