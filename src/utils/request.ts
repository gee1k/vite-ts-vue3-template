import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    Promise.reject(error)
  },
)

type BaseResponse<T> = {
  code: number
  data: T
  msg?: string
}

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>,
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options,
    })
      .then((res) => {
        const data = res.data as BaseResponse<ResponseType>
        if (data?.code === 0) {
          resolve(data.data)
        } else {
          throw new Error(data.msg || 'Error')
        }
      })
      .catch((err) => {
        console.error('error', err)
        reject(err)
      })
  })
}
export { axiosInstance, request }
