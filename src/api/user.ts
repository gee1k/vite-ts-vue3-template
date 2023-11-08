import type { LoginParams, LoginResultModel, GetUserInfoModel } from './model/user.model'

export function login(data: LoginParams) {
  console.log('login ... ', data)
  return new Promise<LoginResultModel>((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'test',
      })
    }, 1000)
  })
  // return request<LoginResultModel>('/api/user/login', {
  //   method: 'POST',
  //   data,
  // })
}

export function getUserInfo() {
  return new Promise<GetUserInfoModel>((resolve) => {
    setTimeout(() => {
      resolve({
        userId: 100,
        username: 'test',
        realName: 'test',
        avatar: '',
        desc: 'test',
        roles: ['admin'],
      })
    }, 1000)
  })
  // return request<GetUserInfoModel>('/api/user/info', {
  //   method: 'GET',
  // })
}
