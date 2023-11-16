import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
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
  data: T
  meta: {
    error: boolean
    code?: number
    message?: string
  }
}

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>,
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance<BaseResponse<ResponseType>>({
      url,
      ...options,
    })
      .then((res) => {
        const data = res.data
        if (!data.meta.error) {
          resolve(data.data)
        } else {
          throw new Error(data.meta.message || 'Error')
        }
      })
      .catch((err) => {
        console.error('error', err)
        reject(err)
      })
  })
}
export { axiosInstance, request }
