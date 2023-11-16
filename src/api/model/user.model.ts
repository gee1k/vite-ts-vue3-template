export interface LoginParams {
  identifier: string
  password: string
}

export interface LoginResultModel {
  token: string
}

export interface GetUserInfoModel {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  roles: string[]
}
