import { request } from '@/utils/request'

export function getUserInfo() {
  return request<{ id: number; name: string }>('/api/user/info', {
    method: 'GET',
  })
}
